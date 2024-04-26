'use client'

import Nav from "@/components/navigation";

interface TabLayoutType {
    children: React.ReactNode
};

const TabLayout = (props: TabLayoutType) => {
    const { children } = props;
    return (
        <>
            <div className="px-6">
                {children}
            </div>
            <Nav/>
        </>
    );
}

export default TabLayout;