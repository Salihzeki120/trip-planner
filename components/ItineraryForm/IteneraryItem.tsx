import { RefObject, useEffect, useRef } from "react";

type IteneraryResultProps = {
    result: string;
}

const IteneraryResult = ({ result }: IteneraryResultProps) => {
    const tripRef: RefObject<HTMLParagraphElement> = useRef(null);
    const wrapperRef: RefObject<HTMLDivElement> = useRef(null);

    useEffect(() => {
        if (tripRef.current) {
            tripRef.current.innerText = result;

            if (wrapperRef.current) wrapperRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [result]);

    return (
        <div ref={wrapperRef} className="pb-48 mt-8">
            <h2 className="text-2xl font-bold mb-4 color-effect">Your Trip</h2>
            <p ref={tripRef} />
        </div>
    )
}

export default IteneraryResult;