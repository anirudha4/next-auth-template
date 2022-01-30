import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
const withGaurd = (WrappedComponent) => {
    return (props) => {
        const { data:session } = useSession();

        if (typeof window !== "undefined") {
            const router = useRouter();
            if (!session) {
                router.replace("/");
                return null;
            }
            return <WrappedComponent {...props} />;
        }
        return null;
    };
};
export default withGaurd;