import { Routes, Route, Outlet } from "react-router-dom";
import { UserRoles } from "../../core/modules/users/constants";
import {
    AuthRoutes,
    CategoryRoutes,
    HomeRoutes,
    HouseRoutes,
    OfficeRoutes,
    UserRoutes,
} from "../../core/routing";
import AppLayout from "./AppLayout";
import AuthContainer from "./Auth/AuthContainer";
import AuthProvider from "./Auth/AuthProvider";
import LoginScreen from "./Auth/Login/LoginScreen";
import OnboardingLayout from "./Auth/OnboardingLayout";
import RegisterScreen from "./Auth/Register/RegisterScreen";
import RoleContainer from "./Auth/RoleContainer";
import HomeDetailLayout from "./Screens/Home/Detail/HomeDetailLayout";
import HomeDetailScreen from "./Screens/Home/Detail/HomeDetailScreen";
import ForSaleOverviewScreen from "./Screens/Home/For Sale/ForSaleOverviewScreen";
import HomeLayout from "./Screens/Home/HomeLayout";
import HomeOverviewScreen from "./Screens/Home/Overview/HomeOverviewScreen";
import ToRentOverviewScreen from "./Screens/Home/To Rent/ToRentOverviewScreen";
import HouseAddScreen from "./Screens/Houses/Add/HouseAddScreen";
import OfficeAddScreen from "./Screens/Offices/Add/OfficeAddScreen";
import HouseDetailLayout from "./Screens/Houses/Detail/HouseDetailLayout";
import OfficeDetailLayout from "./Screens/Offices/Detail/OfficeDetailLayout";
import HouseDetailScreen from "./Screens/Houses/Detail/HouseDetailScreen";
import OfficeDetailScreen from "./Screens/Offices/Detail/OfficeDetailScreen";
import HouseEditScreen from "./Screens/Houses/Edit/HouseEditScreen";
import OfficeEditScreen from "./Screens/Offices/Edit/OfficeEditScreen";
import HouseLayout from "./Screens/Houses/HouseLayout";
import OfficeLayout from "./Screens/Offices/OfficeLayout";
import HouseOverviewScreen from "./Screens/Houses/Overview/HouseOverviewScreen";
import OfficeOverviewScreen from "./Screens/Offices/Overview/OfficeOverviewScreen";
import ProfileDetailLayout from "./Screens/Profiles/Detail/ProfileDetailLayout";
import ProfileDetailScreen from "./Screens/Profiles/Detail/ProfileDetailScreen";
import ProfileEditScreen from "./Screens/Profiles/Edit/ProfileEditScreen";
import UserAddScreen from "./Screens/Users/Add/UserAddScreen";
import UserDetailLayout from "./Screens/Users/Detail/UserDetailLayout";
import UserDetailScreen from "./Screens/Users/Detail/UserDetailScreen";
import UserEditScreen from "./Screens/Users/Edit/UserEditScreen";
import UsersOverviewScreen from "./Screens/Users/Overview/UsersOverviewScreen";
import UsersLayout from "./Screens/Users/UsersLayout";
import CategoryLayout from "./Screens/Categories/CategoryLayout";
import CategoryOverviewScreen from "./Screens/Categories/Overview/CategoryOverviewScreen";
import CategoryAddScreen from "./Screens/Categories/Add/CategoryAddScreen";
import CategoryEditScreen from "./Screens/Categories/Edit/CategoryEditScreen";
import CategoryDetailLayout from "./Screens/Categories/Detail/CategoryDetailLayout";

const App = () => {
    return (
        <AuthProvider>
            <Routes>
                <Route path={HomeRoutes.Index} element={<HomeLayout />}>
                    <Route index element={<HomeOverviewScreen />} />
                    <Route
                        path={HomeRoutes.Detail}
                        element={<HomeDetailLayout />}>
                        <Route index element={<HomeDetailScreen />} />
                    </Route>
                    <Route
                        path={HomeRoutes.ForSale}
                        element={<ForSaleOverviewScreen />}
                    />
                    <Route
                        path={HomeRoutes.ToRent}
                        element={<ToRentOverviewScreen />}
                    />
                </Route>
                <Route path={AuthRoutes.Index} element={<OnboardingLayout />}>
                    <Route path={AuthRoutes.Login} element={<LoginScreen />} />
                    <Route
                        path={AuthRoutes.Register}
                        element={<RegisterScreen />}
                    />
                </Route>

                <Route
                    element={
                        <AuthContainer>
                            <AppLayout />
                        </AuthContainer>
                    }>
                    {/* Admin */}
                    <Route
                        element={
                            <RoleContainer roles={[UserRoles.Admin]}>
                                <Outlet />
                            </RoleContainer>
                        }>
                        {/* Users */}
                        <Route
                            path={UserRoutes.Index}
                            element={<UsersLayout />}>
                            <Route index element={<UsersOverviewScreen />} />
                            <Route
                                path={UserRoutes.New}
                                element={<UserAddScreen />}
                            />
                            <Route
                                path={UserRoutes.Detail}
                                element={<UserDetailLayout />}>
                                <Route index element={<UserDetailScreen />} />
                                <Route
                                    path={UserRoutes.Edit}
                                    element={<UserEditScreen />}
                                />
                            </Route>
                        </Route>
                        {/* Offices */}
                        <Route
                            path={OfficeRoutes.Index}
                            element={<OfficeLayout />}>
                            <Route index element={<OfficeOverviewScreen />} />
                            <Route
                                path={OfficeRoutes.New}
                                element={<OfficeAddScreen />}
                            />
                            <Route
                                path={OfficeRoutes.Detail}
                                element={<OfficeDetailLayout />}>
                                <Route index element={<OfficeDetailScreen />} />
                                <Route
                                    path={OfficeRoutes.Edit}
                                    element={<OfficeEditScreen />}
                                />
                            </Route>
                        </Route>
                        {/* Categories */}
                        <Route
                            path={CategoryRoutes.Index}
                            element={<CategoryLayout />}>
                            <Route index element={<CategoryOverviewScreen />} />
                            <Route
                                path={CategoryRoutes.New}
                                element={<CategoryAddScreen />}
                            />
                            <Route
                                path={CategoryRoutes.Detail}
                                element={<CategoryDetailLayout />}>
                                <Route
                                    path={CategoryRoutes.Edit}
                                    element={<CategoryEditScreen />}
                                />
                            </Route>
                        </Route>

                        {/* Houses */}
                        <Route
                            path={HouseRoutes.Index}
                            element={<HouseLayout />}>
                            <Route index element={<HouseOverviewScreen />} />
                            <Route
                                path={HouseRoutes.New}
                                element={<HouseAddScreen />}
                            />
                            <Route
                                path={HouseRoutes.Detail}
                                element={<HouseDetailLayout />}>
                                <Route index element={<HouseDetailScreen />} />
                                <Route
                                    path={HouseRoutes.Edit}
                                    element={<HouseEditScreen />}
                                />
                            </Route>
                        </Route>
                    </Route>
                    <Route
                        element={
                            <RoleContainer roles={[UserRoles.User]}>
                                <Outlet />
                            </RoleContainer>
                        }>
                        {/* User */}
                        <Route
                            path={UserRoutes.FindCurrent}
                            element={<ProfileDetailLayout />}>
                            <Route index element={<ProfileDetailScreen />} />
                            <Route
                                path={UserRoutes.EditCurrent}
                                element={<ProfileEditScreen />}
                            />
                        </Route>
                    </Route>
                </Route>
            </Routes>
        </AuthProvider>
    );
};

export default App;
