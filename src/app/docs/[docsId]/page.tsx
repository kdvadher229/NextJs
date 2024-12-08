import {Metadata} from "next"
type Props ={
  params:{
    docsId:string
  }
}

export const generateMetadata = ({params}:Props):Metadata=>{
  return {
    title:`docs ${params.docsId}`
  }
}
export default function PageId() {
  return (
    <div>page Id</div>
  )
}
