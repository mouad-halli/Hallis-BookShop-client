import { createBrowserRouter } from 'react-router-dom'
import { ProductPage } from './ProductPage'
import { Auth } from './Auth/index'
import { ErrorPage } from './error-page'
import App from '../App'
import { SettingsPage } from './SettingsPage'
import { Home } from './Home'
import { Dashboard } from './Dashboard'
import { SearchPage } from './SearchPage'
import { Orders } from './Orders'
import { CreateOrUpdateListing } from './CreateOrUpdateListing'
import { Listings } from './Listings'
import { CartAndCheckoutSideBar } from './CartAndCheckoutSideBar'

export const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: '/',
				element: <Home />
			}
			,
			{
				path: 'auth',
				element: <Auth />
			},
			{
				path: 'search',
				element: <SearchPage />
			},
			{
				path: 'product/:bookId',
				element: <ProductPage />
			},
			{
				path: 'dashboard',
				element: <Dashboard />,
				children: [
					{
						path: 'store',
						children: [
							{
								path: 'listings',
								element: <Listings />,
							},
							{
								path: 'create-listing',
								element: <CreateOrUpdateListing />
							},
						]
					},
					{
						path: 'orders',
						element: <Orders />
					},
					{
						path: 'settings',
						element: <SettingsPage />
					},
					{
						path: 'products',
						element: <Listings />
					}
				]
			},
			{
				path: 'cart',
				element: <CartAndCheckoutSideBar />
			},
		]
	}
])