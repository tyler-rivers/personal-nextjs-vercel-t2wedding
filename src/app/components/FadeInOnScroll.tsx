import { useInView } from 'react-intersection-observer';

// A wrapper component to handle the fade-in-on-scroll animation
const FadeInOnScroll = ({ children }: { children: React.ReactNode }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1, // Trigger when 10% of the element is visible
  });

  const animationClasses = `transition-all duration-700 ease-out ${
    inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
  }`;

  return (
    <div ref={ref} className={animationClasses}>
      {children}
    </div>
  );
};

export default FadeInOnScroll;