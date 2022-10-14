import { lazy, Suspense } from "react";
import { Outlet } from "react-router";
import { Routes, Route } from "react-router-dom";

import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Spinner } from "./reusable/components/Spinner";

import './styles/App.scss';

const Home = lazy(
	() => import("./pages/Home" /* webpackChunkName: "home-page" */)
);

const Superhero = lazy(
	() => import("./pages/Superhero" /* webpackChunkName: "superhero-page" */)
);

export const App = () => {
	return (
		<div className="App">
			<Header />
			<Outlet />
			<Suspense fallback={<Spinner />}>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/:superheroId" element={<Superhero />} />
				</Routes>
			</Suspense>
			<Footer />
		</div>
	);
};
