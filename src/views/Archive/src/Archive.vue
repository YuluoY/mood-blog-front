<template>
  <div class="y-archives">
    <div class="y-archives__inner">
      <div class="y-archives__left y-flex-1">
        <MTimeline :data="timelineData" :total="total" order="DESC">
          <MTimelineYear
            v-for="year in Object.keys(timelineDataStruct)"
            :key="year"
            :year="year"
            :model-value="years"
            :title="year"
            order="DESC"
          >
            <MTimelineMonth
              v-for="(month, index) in Object.keys(timelineDataStruct[year])"
              :key="`${month}-${index}`"
              :month="month"
              :year="year"
              order="DESC"
            >
              <MTimelineDay
                v-for="(day, index2) in Object.keys(timelineDataStruct[year][month])"
                :key="`${day}-${index2}`"
                :day="day"
                :index="index2"
                :month="month"
                :year="year"
                order="DESC"
              >
                <MTimeItem
                  v-for="(item, index3) in timelineDataStruct[year][month][day]"
                  :key="`item-${index3}`"
                  :item="item"
                  @on-more="onMore"
                ></MTimeItem>
              </MTimelineDay>
            </MTimelineMonth>
          </MTimelineYear>
        </MTimeline>
      </div>
      <div class="y-archives__right">
        <HomeSidebar :is-love-show="false" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts" name="Archive">
import { getArticlesByPage } from '@/api/article.ts'
import { MTimelineItem } from '@/components/global/MTimeline/types/index.ts'
import { IArticle } from '@/types/api/article.ts'
import { IQueryFindManyOptions } from '@/types/core/index.ts'
import { HomeSidebar } from '@/views/Home/index.ts'
import dayjs from 'dayjs'
import { getWeekend } from '@/utils/dayjs.ts'
import { useArticleStore } from '@/store/articleStore.ts'

const page = ref(1)
const limit = ref(8)
const total = ref(0)
const query: Partial<IQueryFindManyOptions> = {
  sort: 'createdAt',
  order: 'DESC',
}
const timelineData = reactive([])
const timelineDataStruct = ref<any>({})
const years = reactive<string[]>([])
const router = useRouter()
const articleStroe = useArticleStore()
const res = await getArticlesByPage<IArticle>(page.value, limit.value, query)

const timelineDataFilter = (data: IArticle[]) => {
  const struct = {} as any
  for (let i = 0; i < data.length; i++) {
    const item = data[i]
    const date = dayjs(item.createdAt)
    const year = date.year()
    const month = date.month() + 1
    const day = date.date()

    const newItem: MTimelineItem = {
      id: item.id,
      author: item.author || item.user.username,
      avatar: item.user.avatar,
      commentCount: item.comments.length,
      likeCount: item.likes.length,
      viewCount: item.views.length,
      description: item.description,
      point: { width: 20, color: item.category.cateColor },
      title: item.title,
      year: date.year(),
      month: date.month() + 1,
      day: date.date(),
      weekend: getWeekend(item.createdAt),
      date: date.format('YYYY-MM-DD'),
      tags: item.tags,
      category: item.category,
      cover: item.cover,
    }

    if (struct[year]) {
      if (!struct[year][month]) {
        struct[year][month] = {}
      }
      if (!struct[year][month][day]) {
        struct[year][month][day] = []
      }
      struct[year][month][day].push(newItem)
    } else {
      if (!years.length) {
        years.push(year.toString())
      }
      struct[year] = {}
      struct[year][month] = {}
      struct[year][month][day] = [newItem]
    }
  }
  return struct
}

const onMore = (id: string) => {
  articleStroe.jumpReadArticlePage(router, id)
}

if (res.success) {
  timelineData.length = 0
  timelineData.push(...res.data.list)
  timelineDataStruct.value = timelineDataFilter(res.data.list)
  total.value = res.data.total
}
</script>
<style scoped lang="scss">
.y-archives {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;

  .y-archives__inner {
    width: 70%;
    height: 100%;
    display: flex;
    padding: 20px;

    .y-archives__left {
      padding: 0 20px;
    }

    .y-archives__right {
      width: 300px;
    }
  }
}
</style>
