<script setup lang="ts">
import { breakpointsTailwind } from '@vueuse/core'

const breakpoints = useBreakpoints({ ...breakpointsTailwind, sm: 320, md: 640, laptop: 1200 })

const smallerThanLaptop = breakpoints.smaller('laptop')
</script>

<template>
  <el-descriptions
    title="Храм существует только за счет ваших пожертвований. Внести пожертвования можно:"
    border
    direction="vertical"
    :column="smallerThanLaptop ? 1 : 3"
  >
    <el-descriptions-item label="На карту Сбербанк"
      >4276 4000 4479 9105 (Дмитрий Алексеевич Михайлюк)</el-descriptions-item
    >
    <el-descriptions-item label="По номеру телефона"
      >+7 (916) 500 08-10 (Дмитрий Алексеевич Михайлюк)</el-descriptions-item
    >
    <el-descriptions-item label="По реквизитам">
      <div class="flex flex-col gap-2">
        <span>Банк получателя: ПАО «Сбербанк России» г. Москва</span>
        <span>БИК: 044525225</span>
        <span>Счет банка получателя: № 30101810400000000225</span>
        <span>Счет получателя: № 40703810840000005258</span>
        <span>ИНН: 9725002040</span>
        <span>КПП: 772501001</span>
        <span>ОКПО: 35857501</span>
        <span>ОГРН: 1197700001795</span>
        <span
          >Получатель: РЕЛИГИОЗНАЯ ОРГАНИЗАЦИЯ ПОДВОРЬЕ ПАТРИАРХА МОСКОВСКОГО И ВСЕЯ РУСИ ПРИ ХРАМЕ
          ВМЧ. ГЕОРГИЯ ПОБЕДОНОСЦА В КУРКИНЕ Г. МОСКВЫ РУССКОЙ ПРАВОСЛАВНОЙ ЦЕРКВИ (МОСКОВСКИЙ
          ПАТРИАРХАТ)</span
        >
      </div>
    </el-descriptions-item>
    <el-descriptions-item label="по QR">
      <NuxtImg class="mx-auto h-[196px]" src="/img/donationQR.png" />
    </el-descriptions-item>
  </el-descriptions>
</template>

<style lang="postcss" scoped>
:deep(.el-descriptions__label.el-descriptions__cell.is-bordered-label) {
  @apply font-bold;
}
</style>
