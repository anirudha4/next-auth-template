import { excludedInputPropsForTextarea } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
const withGaurd = (WrappedComponent) => {
    return function Component(props) {
        const router = useRouter();
        const { data:session } = useSession();
        if (typeof window !== "undefined") {
            if (!session) {
                router.replace("/");
                return null;
            }
            return <WrappedComponent {...props} />;
        }
        return null;
    };
};
withGaurd.displayName = 'withGaurd';
export default withGaurd