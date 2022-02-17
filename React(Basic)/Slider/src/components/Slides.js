import React, {useState, useEffect, useRef} from 'react';
import SingleSlide from "./SingleSlide";

function Slides({slides}) {
    const [currentSlide, setCurrentSlide] = useState({
      slide: slides[0],
      index: 0
    })
    const restartRef = useRef(null)
    const prevRef = useRef(null)
    const nextRef = useRef(null)
    useEffect(() => {
      setCurrentSlide({slide: slides[0], index: 0})
    }, [slides])

    useEffect(() => {
        restartRef.current.disabled = currentSlide.index === 0;
        prevRef.current.disabled = currentSlide.index === 0;
        nextRef.current.disabled = currentSlide.index === slides.length - 1;
        // eslint-disable-next-line
    }, [currentSlide])

    const Restart = () => {
        setCurrentSlide({
            slide: slides[0],
            index: 0
        })
    }
    const Prev = () => {
        setCurrentSlide(current => {
            return {
                slide: slides[current.index - 1],
                index: current.index - 1
            }
        })
    }
    const Next = () => {
        setCurrentSlide(current => {
            return {
                slide: slides[current.index + 1],
                index: current.index + 1
            }
        })
    }

    return (
        <div>
            <div id="navigation" className="text-center">
                <button ref={restartRef} onClick={Restart} data-testid="button-restart" className="small outlined">Restart</button>
                <button ref={prevRef} onClick={Prev} data-testid="button-prev" className="small">Prev</button>
                <button ref={nextRef} onClick={Next} data-testid="button-next" className="small">Next</button>
            </div>
            <SingleSlide slide={currentSlide.slide}/>
        </div>
    );

}

export default Slides;
