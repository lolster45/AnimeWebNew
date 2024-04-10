//React icons...
import { FcPrevious, FcNext } from "react-icons/fc";

import { MdNavigateNext } from "react-icons/md";

import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";






var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
    prevArrow: <GrPrevious/>, // Use custom previous arrow component
    nextArrow: <GrNext/>,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
         
        }
      },
      {
        breakpoint: 570,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        }
      },
      // {
      //   breakpoint: 480,
      //   settings: {
      //     slidesToShow: 1,
      //     slidesToScroll: 1
      //   }
      // }
    ]
};

const settingsMain = {
  dots: true,
  infinite: true,
  speed: 1000, // Adjust the speed as needed
  slidesToShow: 1,
  slidesToScroll: 1,
  fade: true, // Enable fade effect
  autoplay: true, // Enable autoplay
  autoplaySpeed: 6000, // Set autoplay interval to 4 seconds
  prevArrow: <GrPrevious/>, // Use custom previous arrow component
  nextArrow: <GrNext/>
}



import eliteClassM from "/COTEM.jpg"
import ClassElitePC from "/ClassOfElitePC.png"

import Clannad from "/ClannadAfterPic.jpg";
  import MyHeroAcademia from "/MyHeroAcaPic.png";
  import NanoMachine from "/NanoMachine.jpg";
  import OmniscientReader from "/omniscientReader.jpg";
  import OnePiecePic from "/OnePiecePic.webp";
  import Princess from "/Princess.jpg";
  import SecondLifeRanker from "/SecondLifeRanker.jpg";
  import SoloLeveling from "/SoloLeveling.jpg";
  import SteinsGatePic from "/SteinsGatePic.jpg";
  import TenageMercenary from "/TeenageMerc.jpg";
  import YourLieInApril from "/YourLiePic.jpg";


  import SoloLevelingM from "/SL.png"
  import Elf from "/FBJE.png"
  import BlueExorsistM from "/BE.png"
  import ClassOfEliteM from "/COTE.png"

  
  
const trendingSlider = [
  {
    id: "52991",
    image: "https://wallpapercave.com/wp/wp13268626.jpg",
    title: "Frieren: Beyond Journey's End",
    mobileImage: Elf,
    synopsis: "During their decade-long quest to defeat the Demon King, the members of the hero's party—Himmel himself, the priest Heiter, the dwarf warrior Eisen, and the elven mage Frieren—forge bonds through adventures and battles. However..."
  },
  {
    id: "9919",
    image: "https://static.crunchyroll.com/fms/landscape_large/1920x1080/94/png/cdceb41d-05bf-4793-8df9-86acb4569f4e.webp",
    mobileImage: BlueExorsistM,
    title: "Blue Exorsist",
    synopsis: "Humans and demons are two sides of the same coin, as are Assiah and Gehenna, their respective worlds. The only way to travel between the realms is by the means of possession, like in ghost stories. However..."
  },
  {
    id: "51180",
    image: ClassElitePC,
    mobileImage: ClassOfEliteM,
    title: "Classroom of the Elite",
    synopsis: ""
  },
  {
    id: "121496",
    image: "https://assets-prd.ignimgs.com/2024/01/05/solo-leveling-blogroll-1704495061423.jpeg",
    mobileImage: SoloLevelingM,
    title: "Solo Leveling",
    synopsis: 'Ten years ago, "the Gate" appeared and connected the real world with the realm of magic and monsters. To combat these vile beasts, ordinary people received superhuman powers and became known as "Hunters."...'
  },
]

//Image carousl...
const images = [
    {
        id: "31964",
        image: MyHeroAcademia,
        title: "Boku no Hero Academia"
    },
    {
        id: "4181",
        image: Clannad,
        title: "Clannad: After Story"
    },
    {
        id: "23273",
        image: YourLieInApril,
        title: "Your Lie in April"
    },
    {
        id: "9253",
        image: SteinsGatePic,
        title: "Steins;Gate"
    },
    {
        id: "21",
        image: OnePiecePic,
        title: "One Piece"
    }
]

//Manhwa carousel images...
const manhwa = [
    {
        id: "121496",
        image: SoloLeveling,
        title: "Solo Leveling"
    },
    {
        id: "132214",
        image: OmniscientReader,
        title: "Omniscient Reader"
    },
    {
        id: "121269",
        image: Princess,
        title: "Who Made Me a Princess"
    },
    {
        id: "146966",
        image: TenageMercenary,
        title: "Teenage Mercenary"
    },
    {
        id: "147863",
        image: NanoMachine,
        title: "Nano Machine"
    },
    {
        id: "147324",
        image: SecondLifeRanker,
        title: "Second Life Ranker"
    }
]

export {settings, settingsMain, images, manhwa, trendingSlider}