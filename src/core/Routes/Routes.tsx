
import { ROUTES } from "constant"
import { ManageSafetyReportContainer } from "features"
import ManageHeaderForm from "features/ManageHeader/components/ManageHeaderForm"
// import { NormalRoute, SecureRoute } from "hocs"
// import { NormalRoute, SecureRoute } from "hoc"
import { Route, Routes as ReactRoutes } from "react-router"
import { AddProjectForm, AddUser, Admins, Analytics, Login, NewPassword, ReportDetails, SafetyReport, Settings, TwoFactor, UserProfile, Users } from "screens"



const Routes = () => {
    return (
        <ReactRoutes>
            {/* <Route element={<SecureRoute />}> */}
                <Route path={ROUTES.ADMINS} element={<Admins />} />
                <Route path={ROUTES.USERS} element={<Users />} />
                <Route path={ROUTES.ADD_USER} element={<AddUser />} />
                <Route path={`${ROUTES.USERS_Profile}/:id`} element={<UserProfile />} />
                <Route path={ROUTES.SAFETY_REPORT} element={<SafetyReport />} />
                <Route path={`${ROUTES.SAFETY_DETAILS}/:id`} element={<ReportDetails />} />
                <Route path={ROUTES.ANALYTICS} element={<Analytics />} />
                <Route path={ROUTES.SETTINGS} element={<Settings />} />
            {/* </Route> */}

            {/* <Route element={<NormalRoute />}> */}
                <Route path={ROUTES.LOGIN} element={<Login />} />
                <Route path={ROUTES.ManageHeader} element={<ManageHeaderForm/>} />
                <Route path={ROUTES.TWO_FACTOR} element={<TwoFactor />} />
                <Route path={ROUTES.NEW_PASSWORD} element={<NewPassword />} />
            {/* </Route> */}
            {/* ManageUserForm */}
              {/* <Route path={ROUTES.AddProjectForm} element={<AddProjectForm />} /> */}
         


        </ReactRoutes>
    )
}

export default Routes
