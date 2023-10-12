type Computed_Range<N extends number, Result extends Array<unknown> = []> = (
  Result['length'] extends N ? 
  Result :
  Computed_Range<N, [...Result, Result['length']]> 
)

type TimeUnit = 's' | 'm' | 'h' | 'd';
type ZeroToSixty = Computed_Range<60>[number]

export type ExpiresInType = {
  [Key1 in ZeroToSixty]: {
    [Key2 in TimeUnit]: `${Key1}${Key2}`
  }
}[ZeroToSixty][TimeUnit]
