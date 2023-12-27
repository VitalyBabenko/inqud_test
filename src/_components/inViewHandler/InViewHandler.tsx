import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

type InViewHandlerProps = {
  title: string;
  onIntersection: (title: string) => void;
  children: React.ReactNode;
};

const InViewHandler = ({ title, onIntersection, children }: InViewHandlerProps) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    delay: 100,
    trackVisibility: true,
    onChange(inView, entry) {
      if (!inView) {
      }
      console.log({ inView, entry });
    },
  });

  useEffect(() => {
    if (inView) {
      onIntersection(title);
    }
  }, [inView, title, onIntersection]);

  return <div ref={ref}>{children}</div>;
};

export default InViewHandler;
