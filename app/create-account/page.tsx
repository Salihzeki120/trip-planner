import Hero from "@/components/Layout/Hero";
import PageWrapper from "@/components/Layout/PageWrapper";

const Page = () => (
    <PageWrapper>
        <Hero
            title={<>Work in <span className="color-effect">progress</span>!</>}
            description="Stay tuned for updates!"
        />
    </PageWrapper>
)

export default Page;