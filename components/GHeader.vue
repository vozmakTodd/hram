<script setup lang="ts">
import { breakpointsTailwind } from '@vueuse/core'
import { EOrderDropdownCommand } from '~/types/common'

const breakpoints = useBreakpoints({ ...breakpointsTailwind, sm: 320, md: 640, laptop: 1200 })

const smallerThanLaptop = breakpoints.smaller('laptop')
const smallerThanMd = breakpoints.smaller('md')
const drawer = ref<boolean>(false)
const orderType = ref<EOrderDropdownCommand>()
const orderDialog = ref<boolean>(false)
const donationDialog = ref<boolean>(false)

const handleCommand = (type: EOrderDropdownCommand) => {
  orderType.value = type
  orderDialog.value = true
}
</script>

<template>
  <el-header class="bg-white" height="70px">
    <div class="flex h-full gap-3">
      <NuxtLink class="flex h-full gap-3 mr-auto" to="/">
        <ElImage class="p-1" src="/img/logo.png" style="width: 70px" />
        <div class="flex flex-col justify-center laptop:text-sm text-2sm">
          <span>Храм вмч.</span>
          <span>Георгия Победоносца</span>
          <span>в Куркине г. Москвы</span>
        </div>
      </NuxtLink>
      <GNavMenu v-if="!smallerThanLaptop" horizontal />
      <div
        v-if="!smallerThanMd"
        class="flex items-center h-full lg:border-b-2 px-5 laptop:px-0 gap-3"
        style="border-color: transparent"
      >
        <ElButton type="primary" class="my-auto" @click="donationDialog = true">
          Помочь храму
        </ElButton>
        <el-dropdown @command="handleCommand">
          <el-button type="primary">
            Заказать<el-icon class="el-icon--right"><Icon name="bx:chevron-down" /></el-icon>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item :command="EOrderDropdownCommand.DEMAND">Требы</el-dropdown-item>
              <el-dropdown-item :command="EOrderDropdownCommand.CANDLE">
                Поставить свечки
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <GBurger v-if="smallerThanLaptop" @click="drawer = true" />
      <ElDrawer
        v-if="smallerThanLaptop"
        v-model="drawer"
        direction="rtl"
        title="Меню"
        :size="smallerThanMd ? '100%' : '300px'"
        class="common-layout__drawer"
      >
        <GNavMenu @click="drawer = false" />
        <div
          v-if="smallerThanMd"
          class="flex flex-col gap-4 items-start lg:h-full lg:border-b-2 mt-5"
        >
          <ElButton type="primary" class="my-auto h-[56px] w-full" @click="donationDialog = true">
            Помочь храму
          </ElButton>
          <ElButton
            type="primary"
            class="my-auto ml-0 h-[56px] w-full"
            @click="handleCommand(EOrderDropdownCommand.DEMAND)"
          >
            Заказать требы
          </ElButton>
          <ElButton
            type="primary"
            class="my-auto ml-0 h-[56px] w-full"
            @click="handleCommand(EOrderDropdownCommand.CANDLE)"
          >
            Поставить свечки
          </ElButton>
        </div>
      </ElDrawer>
    </div>
    <GOrderDialog v-if="orderType" v-model="orderDialog" :type="orderType" />
    <GDonationDialog v-model="donationDialog" />
  </el-header>
</template>

<style scoped></style>
