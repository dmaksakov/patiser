import mock from "./mock"
import "./navbar/navbarSearch"
import "./navbar/navbarBookmarkSearch"
import "./auth/authentication"
import "./apps/calendar"

mock.onAny().passThrough()
