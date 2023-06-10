import { useEffect } from 'react';
import './HomeStyle.css';
import SidebarPhim from './SidebarPhim';
import SidebarAnime from './SidebarAnime';
import Layout from '../Layout/Layout';
function HomePagest() {

    return (
        <Layout >

            <SidebarPhim />
            <SidebarAnime />
            
        </Layout>
    )
}

export default HomePagest