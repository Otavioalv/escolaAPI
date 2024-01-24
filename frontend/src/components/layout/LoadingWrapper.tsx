import { ReactNode } from "react";
import Loading from "../Loading";

interface LoadingWrapperProps {
  loading: boolean;
  children: ReactNode;
}

const LoadingWrapper: React.FC<LoadingWrapperProps> = ({ loading, children }) => {
  return loading ? <Loading /> : <>{children}</>;
};

export default LoadingWrapper;



