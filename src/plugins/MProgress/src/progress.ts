import { SetupContext, defineComponent, h, onMounted, onUnmounted, ref, watch } from "vue";
import { MProgressProps, props } from "../types/index.ts";

// eslint-disable-next-line no-shadow
const setup = (props: MProgressProps, _ctx: SetupContext) => {
    const com = ref({ ...props })
    const MProgressBarRef = ref<HTMLElement>(null);

    const scrollHandle = () => {
        // 计算滚动条滑动距离，滑动距离/滚动条总长度
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
        const clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
        const scrollPercent = scrollTop / (scrollHeight - clientHeight) * 100;
        MProgressBarRef.value.style.width = `${scrollPercent}%`;
    }

    const MProgressPropsWatch = watch(com, (newVal) => {
        com.value = newVal;
    })

    onMounted(() => {
        if (!MProgressBarRef.value) {
            MProgressBarRef.value = document.querySelector('.m-progress .m-progress__bar') as HTMLElement;
        }
        window.addEventListener('scroll', scrollHandle);
    })

    onUnmounted(() => {
        MProgressPropsWatch();
        window.removeEventListener('scroll', scrollHandle);
    })

    return {
        height: `${com.value.height}px`,
        color: com.value.color,
    }
}
function render(this: MProgressProps) {
    return h('div', {
        class: 'm-progress',
        style: {
            height: this.height,
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 999999,
            width: '100%',
        }
    }, [
        h('div', {
            class: 'm-progress__bar',
            ref: 'MProgressBarRef',
            style: {
                width: '0%',
                height: this.height,
                backgroundColor: this.color,
            }
        })
    ])
}

export default defineComponent({
    name: 'MProgress',
    props,
    setup,
    render,
})