const SectionTitleMap=({heading, subHeading})=>{
    return(
        <div className="mx-auto md:w-4/12 text-center my-8">
           <p className="text-yellow-600 my-2 text-xl">--- {subHeading} ---</p>
           <h3 className="text-3xl uppercase border-y-4 py-4">{heading}</h3>
           
        </div>
    );
};
 export default SectionTitleMap;