import { getBannerAPI } from "@/apis/home.js";
import { onMounted, ref } from 'vue';
export const useBanner = () => {
    const bannerList = ref([])
    const getBanner = async () => {
        const res = await getBannerAPI({
            distributionSite: '2'
        })
        bannerList.value = res.result
    }
    onMounted(() => getBanner())

    return {
        bannerList
    }
}