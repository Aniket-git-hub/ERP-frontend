import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";

const TabsComponent = ({ tabs, defaultIndex = 0, orientation = "horizontal" }) => {
    return (
        <Box>
            <Tabs orientation={orientation} variant='enclosed' defaultIndex={defaultIndex}>
                <TabList>
                    {tabs.map((tab, index) => (
                        <Tab key={index} _selected={{ bg: "purple.600", color: 'purple.50', fontWeight: "bolder" }}>
                            {tab.title}
                        </Tab>
                    ))}
                </TabList>
                <TabPanels>
                    {tabs.map((tab, index) => (
                        <TabPanel key={index}>{tab.component}</TabPanel>
                    ))}
                </TabPanels>
            </Tabs>
        </Box>
    );
};

export default TabsComponent;
