import { Outlet } from "react-router-dom";
import useFetch from "../../../../../core/hooks/useFetch";
import Alert from "../../../../Design/Alert";
import { useUser } from "../../../Auth/AuthProvider";
import LoadingIndicator from "../../../Shared/Generic/LoadingIndicator/LoadingIndicator";

const ProfileDetailLayout = () => {
    const currentUser = useUser();

    const {
        isLoading,
        error,
        invalidate,
        data: user,
    } = useFetch(`/profile/${currentUser.id}`);

    const handleUpdate = () => {
        invalidate();
    };

    if (error) {
        return <Alert color="danger">{error}</Alert>;
    }

    if (isLoading) {
        return <LoadingIndicator />;
    }

    return <Outlet context={{ user, onUserUpdate: handleUpdate }} />;
};

export default ProfileDetailLayout;
