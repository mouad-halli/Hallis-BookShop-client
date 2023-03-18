import { useEffect } from "react"
import { useLocation } from "react-router"

export const useStyleListOnRouteChangeHook = (
    listRefsMap: Map<string, React.RefObject<HTMLDivElement>>, defaultBgColor: string,
    defaultTextColor: string, bgColor: string, textColor: string
) => {

    const location = useLocation()

    const pathRouteNames = location.pathname.split('/')

    useEffect(() => {

        const routeName = pathRouteNames.at(-1)
        if (routeName) {
            const routeButtonRefStyle = listRefsMap.get(routeName)?.current?.style
            if (routeButtonRefStyle) {
                routeButtonRefStyle.backgroundColor = bgColor
                routeButtonRefStyle.color = textColor
            }
        }

        // pathRouteNames.map(route => {
        //     const routeButtonRefStyle = listRefsMap.get(route)?.current?.style
        //     if (routeButtonRefStyle) {
        //         routeButtonRefStyle.backgroundColor = bgColor
        //         routeButtonRefStyle.color = textColor
        //     }
        // })

        return () => {
            const routeName = pathRouteNames.at(-1)
            if (routeName) {
                const routeButtonRefStyle = listRefsMap.get(routeName)?.current?.style
                if (routeButtonRefStyle) {
                    routeButtonRefStyle.backgroundColor = defaultBgColor
                    routeButtonRefStyle.color = defaultTextColor
                }
            }
            // pathRouteNames.map(route => {
            //     const routeButtonRefStyle = listRefsMap.get(route)?.current?.style
            //     if (routeButtonRefStyle) {
            //         routeButtonRefStyle.backgroundColor = defaultBgColor
            //         routeButtonRefStyle.color = defaultTextColor
            //     }
            // })
        }

    }, [location])

}