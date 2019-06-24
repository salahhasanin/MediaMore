import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Layout from "../views/Layout";
import Login from "../views/Login";
import Register from "../views/Register";

import Home from "@/views/Home";
import Form from "@/views/Form";
import Table from "@/views/Table";
import Calendar from "@/views/Calendar";
import Timeline from "@/views/Timeline";
import Steps from "@/views/Steps";
import Cards from "@/views/Cards";
import Mailbox from "@/views/Mailbox";
import Page2 from "@/views/Page2";
import Main from "@/views/Main";
import PlaceDetails from "@/views/PlaceDetails";
import PopularPlaces from "@/views/PopularPlaces";
import Profile from "@/views/Profile";
import Favourites from "@/views/Favourites";
import Users from "@/views/Users"
import Places from "@/views/Places"
import AddPlace from "@/views/Places/addPlace"

export const childRoutes = [
  {
    path: "/home",
    component: Main,
    exactly: true
  },
  {
    path: "/fav",
    component: Favourites
  },
  {
    path: "/form",
    component: Form
  },
  {
    path: "/add-place",
    component: AddPlace
  },
  {
    path: "/add-user",
    component: AddPlace
  },
  {
    path: "/users",
    component: Users
  },
  {
    path: "/places",
    component: Places
  },
  {
    path: "/place-details",
    component: PlaceDetails
  },
  {
    path: "/table",
    component: Table
  },
  {
    path: "/popular-place",
    component: PopularPlaces
  },
  {
    path: "/profile",
    component: Profile
  },
  {
    path: "/calendar",
    component: Calendar
  },
  {
    path: "/timeline",
    component: Timeline
  },
  {
    path: "/steps",
    component: Steps
  },
  {
    path: "/cards",
    component: Cards
  },
  {
    path: "/mailbox",
    component: Mailbox
  },
  {
    path: "/page2",
    component: Page2
  }
];

const routes = (
  <Switch>
    <Route path="/login" component={Login} />
    <Route path="/register" component={Register} />
    <Route path="/" component={Layout} />
  </Switch>
);

export default routes;
