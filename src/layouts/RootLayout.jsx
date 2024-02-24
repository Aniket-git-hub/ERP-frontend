import { Grid, GridItem } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import LeftSidePanel from "../components/dashboard/LeftSidePanel";

export default function RootLayout() {

    return (
        <>
            <Grid templateColumns="repeat(12, 1fr)">
                <GridItem as="aside" colSpan={1} >
                    <LeftSidePanel />
                </GridItem>
                <GridItem
                    py={2}
                    as="main" colSpan={11} h={{ lg: "100vh" }} overflowY={"scroll"} sx={
                        {
                            '::-webkit-scrollbar': {
                                display: 'none'
                            }
                        }
                    } >
                    {/* <Grid templateColumns="repeat(5, 1fr)">
                        <GridItem colSpan={4} h={{ lg: "90vh" }} overflowY={"scroll"} sx={
                            {
                                '::-webkit-scrollbar': {
                                    display: 'none'
                                }
                            }
                        }>
                            <Outlet />
                        </GridItem>
                        <GridItem as="aside" colSpan={1} >
                            <div>
                                <h1>Right Side Panel</h1>
                            </div>
                        </GridItem>
                    </Grid> */}
                    <Outlet />

                </GridItem>
            </Grid>
        </>
    );
}
