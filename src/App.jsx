import React, { Suspense, useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authSliceActions } from "./store/authSlice";
import { homePageFiltersSliceActions } from "./store/homePageFiltersSlice";
import { useFetchAccountInfoQuery } from "./services/accountService";
import Layout from "./components/UI/Layout/Layout";
import LoadingSpinner from "./components/UI/LoadingSpinner/LoadingSpinner";
import routes from "./router";
import "./App.scss";
import "leaflet/dist/leaflet.css";

const App = () => {
  const token = useSelector((state) => state.authSliceReducer.token);
  const { data: accountInfo, isError } = useFetchAccountInfoQuery("", {
    skip: !token,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname, search } = useLocation();

  useEffect(() => {
    if (!accountInfo) return;
    const { completed_counter, active_checklists_counter } = accountInfo;
    dispatch(authSliceActions.setUser(accountInfo));
    dispatch(
      authSliceActions.setPercentActiveChecklist({
        completed_counter,
        active_checklists_counter,
      })
    );
  }, [accountInfo]);

  useEffect(() => {
    if (!isError) return;
    dispatch(authSliceActions.resetUser());
    dispatch(authSliceActions.resetToken());
    navigate("/error");
  }, [isError]);

  useEffect(() => {
    if (pathname !== "/") return;
    dispatch(homePageFiltersSliceActions.setUrl(search));
  }, [search]);

  useEffect(() => {
    dispatch(authSliceActions.tokenVerification());
  }, []);

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Layout>
        <Routes>
          {routes.map((route) => (
            <Route key={route.id} path={route.path} element={route.element} />
          ))}
        </Routes>
      </Layout>
    </Suspense>
  );
};

export default App;
