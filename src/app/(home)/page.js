
import { getPosts } from "../components/handler/datahandler"
import InfinteScroll from "../components/handler/infinteScroll"


export default async  function Home() {

  const initValue = await getPosts (1);


  return (
    <main >
      {
        initValue
        ?
        <InfinteScroll key ={1} initValue={initValue}/>
        :
        null
      }
    </main>
  )
}
