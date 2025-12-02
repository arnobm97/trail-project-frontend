
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import useMenu from '../../../../Hooks/useMenu';
import { useState } from 'react';
import RentCard2 from '../../../../Components/RentCard2/RentCard2';
const Oder = () => {
    const [tabIndex, setTabIndex]=useState(0);
   const [menu] = useMenu();
    const flat= menu.filter(item=>
        item.category==='flat');
    const soup= menu.filter(item=>
        item.category==='soup');
    const salad= menu.filter(item=>
        item.category==='salad');
    const pizza= menu.filter(item=>
        item.category==='pizza');
    const offered= menu.filter(item=>
        item.category==='offered');
   
  return (
    <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
      <TabList>
        <Tab>Salad</Tab>
        <Tab>Title 2</Tab>
      </TabList>
      <TabPanel>
        <div className='grid md:grid-cols-3 gap-10'>
        {
            flat.map(item=><RentCard2
            key={item._id}
            item={item}></RentCard2> )
        }
        </div>
      </TabPanel>
      <TabPanel></TabPanel>
    </Tabs>
  );
};
     
export default Oder;