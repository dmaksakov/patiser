import React from "react"
import * as Icon from "react-feather"

const navigationConfig = [
	{
		id: "home",
		title: "Dashboard",
		type: "item",
		icon: <Icon.Home size={20}/>,
		permissions: ["admin", "editor"],
		navLink: "/",
	},
	{
		type: "groupHeader",
		groupTitle: "KITCHEN"
	},
	{
		id: "ingredients",
		title: "Ingredients",
		type: "item",
		icon: <Icon.Layers size={20}/>,
		permissions: ["admin", "editor"],
		navLink: "/ingredients",
	},
	{
		id: "recipes",
		title: "Recipes",
		type: "item",
		icon: <Icon.BookOpen size={20}/>,
		permissions: ["admin", "editor"],
		navLink: "/recipes",
	},
	{
		type: "groupHeader",
		groupTitle: "PRODUCTS"
	},
	{
		id: "categories",
		title: "Categories",
		type: "item",
		icon: <Icon.Package size={20}/>,
		permissions: ["admin", "editor"],
		navLink: "/products/categories",
	},
	{
		id: "products",
		title: "Products",
		type: "item",
		icon: <Icon.Package size={20}/>,
		permissions: ["admin", "editor"],
		navLink: "/products",
	},
	{
		id: "taxes",
		title: "Tax Categories",
		type: "item",
		icon: <Icon.Package size={20}/>,
		permissions: ["admin", "editor"],
		navLink: "/taxes/categories",
	},
	{
		type: "groupHeader",
		groupTitle: "BUSINESS"
	},
	{
		id: "customers",
		title: "Customers",
		type: "item",
		icon: <Icon.Users size={20}/>,
		permissions: ["admin", "editor"],
		navLink: "/customers",
	},
	{
		id: "orders",
		title: "Orders",
		type: "item",
		icon: <Icon.ShoppingBag size={20}/>,
		permissions: ["admin", "editor"],
		navLink: "/orders",
	},
	{
		id: "calendar",
		title: "Calendar",
		type: "item",
		icon: <Icon.Calendar size={20}/>,
		permissions: ["admin", "editor"],
		navLink: "/account/calendar",
	},
	{
		type: "groupHeader",
		groupTitle: "REPORTS"
	},
	// {
	// 	id: "reportsByCustomer",
	// 	title: "By Customer",
	// 	type: "item",
	// 	icon: <Icon.FileText size={20}/>,
	// 	permissions: ["admin", "editor"],
	// 	navLink: "/reports",
	// },
	// {
	// 	id: "reportsByProduct",
	// 	title: "By Product",
	// 	type: "item",
	// 	icon: <Icon.FileText size={20}/>,
	// 	permissions: ["admin", "editor"],
	// 	navLink: "/reports",
	// },
	{
		id: "reportsByOrder",
		title: "Orders",
		type: "item",
		icon: <Icon.ShoppingBag size={20}/>,
		permissions: ["admin", "editor"],
		navLink: "/reports/orders",
	},
	{
		id: "reportsBySales",
		title: "Sales",
		type: "item",
		icon: <Icon.DollarSign size={20}/>,
		permissions: ["admin", "editor"],
		navLink: "/reports/sales",
	},
	{
		id: "reportsByProduct",
		title: "Products",
		type: "item",
		icon: <Icon.ShoppingCart size={20}/>,
		permissions: ["admin", "editor"],
		navLink: "/reports/products",
	},
	{
		id: "reportsProfitLoss",
		title: "Profit & Loss",
		type: "item",
		icon: <Icon.Activity size={20}/>,
		permissions: ["admin", "editor"],
		navLink: "/reports/profit-loss",
	},
]

export default navigationConfig
