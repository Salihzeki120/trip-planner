import Hero from "@/components/Layout/Hero";
import PageWrapper from "@/components/Layout/PageWrapper";

const Page = () => (
    <PageWrapper>
        <Hero
            title={<>About <span className="color-effect">who? why?<br />and when?</span></>}
            description="Stay tuned for updates!"
        />
    </PageWrapper>
)

export default Page;