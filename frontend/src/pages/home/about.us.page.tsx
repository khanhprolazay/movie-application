import { Container } from "@/components/container";
import { Header } from "@/components/Header";
import { Typography } from "@material-tailwind/react";
import { FC } from "react";


export const AboutUsPage: FC = () => {
    return (
        <main className="flex flex-col">
            <Header />
            <Container>
                <div className="min-h-screen font-manrope flex flex-col gap-5 mt-16">
                    <Typography className="text-3xl mx-auto">Tiểu luận chuyên ngành Kỹ thuật Dữ liệu</Typography>
                    <Typography className="text-3xl mx-auto">TÊN ĐỀ TÀI</Typography>
                </div>
            </Container>
        </main>
    );
};
