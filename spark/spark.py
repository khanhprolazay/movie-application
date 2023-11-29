from pyspark.sql import SparkSession

# Create SparkSession object
spark = SparkSession \
        .builder \
        .appName("Python Spark SQL") \
        .config("spark.streaming.stopGracefullyOnShutdown", True) \
        .config('spark.jars.packages', 'org.apache.spark:spark-sql-kafka-0-10_2.12:3.5.0') \
        .config("spark.sql.shuffle.partitions", 4) \
        .master("local[4]") \
        .getOrCreate()

# Create streaming dataframe from kafka topic
# Whenever the movie is access, the movieId will be sent as a payload to the kafka topic "MOVIE.GET_BY_ID"
streaming_df = spark.readStream \
    .format("kafka") \
    .option("kafka.bootstrap.servers", "localhost:29092") \
    .option("subscribe", "MOVIE.GET_BY_ID") \
    .option("startingOffsets", "earliest") \
    .load()

# Create dataframe to store the movieId and timestamps
value_df = streaming_df.selectExpr("CAST( CAST(value AS STRING) AS DECIMAL ) movieId", "CAST(timestamp AS STRING)") 

# Aggregate the dataframe to count the number of times the movieId is accessed
aggregated_df = value_df \
    .groupBy("movieId") \
    .count() \
    .orderBy("movieId")

# Write the aggregated dataframe to the console
writing_df = aggregated_df.writeStream \
    .format("console") \
    .outputMode("complete") \
    .start()

# Start the streaming application to run until the following happens
# 1. Exception in the running program
# 2. Manual Interruption
writing_df.awaitTermination()