import { useState, useRef } from 'react'
import './App.css'
import axios from 'axios';

function App() {
  const [searchVar, setSearchVar] = useState(null);
  const [result, setResult] = useState([]);
  const [lookFor, setLookFor] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const downRef1 = useRef(null);
  const downRef2 = useRef(null);
  const [eventId, setEventId] = useState(null);

  const topRef1 = useRef(null);
  const topRef2 = useRef(null);


  const scrollDown1 = () => {
    if (downRef1?.current) {
      downRef1.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollDown2 = (id) => {
    if (downRef2?.current) {
      downRef2.current.scrollIntoView({ behavior: 'smooth' });
    }
    id = parseInt(id, 10);
    setEventId(id);
    console.log("event" + id);
  };

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
  
    // Using Intl.DateTimeFormat for formatting
    const formatter = new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  
    return formatter.format(date); // Output: "Jan. 9 2025"
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (searchVar == "Artist") {
      
    axios.get(`http://localhost:3000/events/artist/${lookFor}`)
    .then((response) => {
          setResult(response.data);
          console.log(response.data);
        })
        .catch(error => console.log(error));
    }
    else if (searchVar == "City") {
      axios.get(`http://localhost:3000/events/city/${lookFor}`)
      .then((response) => {
            setResult(response.data);
            console.log(response.data);
          })
          .catch(error => console.log(error));
      }

      else {
        alert('Error');
      }

      console.log(result.data);
  
  };


  
  const scrollToTop1 = () => {
    if (topRef1?.current) {
      topRef1.current.scrollIntoView({ behavior: 'smooth' });
    }

  };

  const scrollToTop2 = () => {
    if (topRef2?.current) {
      topRef2.current.scrollIntoView({ behavior: 'smooth' });
    }
  };



  return (
    <body className='font-inter w-screen h-screen overflow-hidden'>
      {/* PAGE 1 */}
          <div className='w-screen h-screen pt-[181px] px-[141px] pb-[142px] overflow-hidden' ref={topRef1}>

      {/* Main stuff */}
    <div className='  w-full h-full'>
    <h1 className="leading-tight">My Music Festival..</h1>
<h1 className="font-normal leading-tight">Find Your Next Music Festival!</h1>

      {/* <div className='h-[34px] w-9 bg-red-600 '></div> */}
      <form className='flex items-center h-[99px]  mt-5 gap-x-3' onSubmit={handleSearch}>
      <input className='w-[1208px] h-[99px] bg-black text-white rounded-[9px] flex justify-start items-center px-[33px] text-[28px] placeholder-white '  
      value={lookFor}
      onChange={(e) => setLookFor(e.target.value)}
      placeholder="Search for a location or an artist...." />
      {/* <input type='text' value={searchVar} />  */}
      <button type="submit" className='flex items-center justify-center  h-[99px] '><img src="Search.png" onClick={scrollDown1}/> </button> 
      </form>
<div className='w-3 h-3 '></div>
<div className='flex gap-x-[10px]'>
{/* bg-black w-[161px] h-[59px] text-white rounded-[9px] flex items-center justify-center cursor-pointer  */}
<button className={` ${searchVar == "Artist" ? "bg-blue-500" : ''}  bg-black w-[161px] h-[59px] text-white rounded-[9px] flex items-center justify-center cursor-pointer`} onClick={() => setSearchVar("Artist")}>
  <p>Artist</p>
</button>
<button className={` ${searchVar == "City" ? "bg-blue-500" : ''}  bg-black w-[161px] h-[59px] text-white rounded-[9px] flex items-center justify-center cursor-pointer`} onClick={() => setSearchVar("City")}>
  <p>City</p>
</button>

{/* <input type='text' value={searchVar} />                TO INCLUDE IN    */}






{/* <div className='bg-black w-[161px] h-[59px] text-white rounded-[9px] flex items-center justify-center '><p>City</p> </div> */}
</div>

    </div>
      {/* Main stuff */}
    </div>
          {/* PAGE 1 */}
          {/* PAGE 2 */}
          <div className='w-screen h-screen ' ref={topRef2}>
            <div className='w-screen h-[88px] flex items-center justify-between pl-[29px] pt-[23px] pr-[60px] ' ref={downRef1}>
            <img src="/reject.png" className=' w-[43px] h-[61px] cursor-pointer' onClick={scrollToTop1} />         
            <p className='font-normal text-[28px]  '>MyMusicFestival</p>    
            </div>
            <div className='h-[39px] w-screen  '></div>
            <div className='w-screen h-full px-[129px]  '>
{result.length > 0 && (
                <h1 className='font-normal '>Search results for “{result ? result[0].artist : ''}”</h1>

)}
              <div className='h-[59px] w-full '></div>
              {/* LIST OF EVENTS */}
{result && (
                <div className='flex flex-col gap-y-[14px] '>
                {result.map((element, i) => (
<button key={i} onClick={() =>scrollDown2(i) } >
<div  className='h-[99px] w-full bg-black rounded-[9px] text-white  flex items-center justify-between px-[45px] '>
                <p className='font-normal text-[28px] w-[520px] flex justify-start '> {element.name} </p>
                <p className='font-normal text-[28px]'>{formatDate(element.date)} </p>
                <p className='font-normal text-[28px] w-[250px] flex justify-end '>{element.city} - {element.country} </p>
                <p className='font-normal text-[28px] w-[80px] flex justify-end '>{element.ticketPrice} $ </p>
              </div>
              {/* ......... */}
              {/* {showDetails && (

)} */}
              {/* ......... */}

</button>
              ))}
              </div> 
)}
                            {/* LIST OF EVENTS */}

            </div>

          </div>
          {/* PAGE 2 */}

      {/* Show details */}
      <div className='w-screen h-screen bg-white flex flex-col'>
      <div className='w-screen h-[88px]  flex items-center justify-between pl-[29px] pt-[23px] pr-[60px] '  ref={downRef2}>
            <img src="/reject.png" className=' w-[43px] h-[61px] cursor-pointer' onClick={scrollToTop2} />         
            <p className='font-normal text-[28px]  ' >MyMusicFestival</p>    
            </div>
            <div className='h-[24px] w-screen'></div>
            
              

{result.length > 0  && result[eventId] && (
  <div className='pl-[188px] h-screen w-full  pr-[60px] pb-[57px]  flex flex-col text-black'>    
  <h1 className='font-semibold text-[67px]'>{result ? result[eventId].artist : ''}</h1>
                <p className='text-[28px] '> {result ? result[eventId].description.substring(0,197)+'...' : ''}</p>
                <div className='h-[68px] w-screen'></div>
              {/* split into two */}
              <div className='w-full h-full flex  pr-[60px]'>
                <div className='flex justify-start items-start pt-6 w-[363px] h-[246px] '>
                <img src={result[eventId].imgUrl} className='object-contain' />
                </div>
                <div className='w-full h-full  flex flex-col items-end'>
<div className='flex'>
<div className='flex flex-col items-end justify-center gap-y-3 pt-4'>
                    <p className='font-normal text-[28px] '>Location/</p>
                    <div className='h-[16px] w-full '></div>
                    <p className='font-normal text-[28px]'>Price/</p>
                  </div>
                  <div className='w-[29px] h-full '></div>
                  <div className='flex flex-col items-end justify-center'>
                    <p className='font-normal text-[67px] '>{result ? result[eventId].city : ''}</p>
                    <p className='font-normal text-[67px]'>{result ? result[eventId].ticketPrice : ''} $</p>
                  </div>
</div>
<h1 className='text-[67px] font-normal underline hover:bg-blue-600 cursor-pointer'>BOOK NOW</h1>
                </div>
              </div>
                            {/* split into two */}
              </div>
)}
              
                                        </div>
{/* Show details */}

    </body>
  )
}

export default App
