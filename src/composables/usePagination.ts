import {computed} from "vue";
import {useRoute,useRouter} from "vue-router";

export const usePagination = () => {
    const route=useRoute()
    const router=useRouter()
    const page=computed({
        get:():number=>route.fullPath.match(/\/page\//g)?(+route.params?.pageNumber||1):(1),
        set:(value:number)=>value===1?router.push(route.fullPath.replace(/\/page\/[0-9]/g,'')):(router.push({...route,params:{...route.params,pageNumber:value}}))
    })
    return { page };
}