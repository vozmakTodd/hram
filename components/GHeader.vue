<script setup lang="ts">
import { EOrderDropdownCommand } from '~/types/common'

const viewport = useViewport()
const drawer = useState<boolean>('drawer', () => false)
const orderType = useState<EOrderDropdownCommand>('orderType')
const orderDialog = useState<boolean>('orderDialog', () => false)
const donationDialog = useState<boolean>('donationDialog', () => false)

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
        <div class="flex flex-col justify-center md:text-sm text-2sm">
          <span>Храм вмч.</span>
          <span>Георгия Победоносца</span>
          <span>в Куркине г. Москвы</span>
        </div>
      </NuxtLink>
      <GNavMenu v-if="!viewport.isLessThan('laptop')" horizontal />
      <div
        v-if="!viewport.isLessThan('md')"
        class="flex items-center h-full lg:border-b-2 px-5 laptop:px-0 gap-3"
        style="border-color: transparent"
      >
        <ElButton type="primary" class="my-auto" @click="donationDialog = true">
          Помочь храму
        </ElButton>
        <el-dropdown trigger="click" @command="handleCommand">
          <el-button type="primary">
            Заказать требы<el-icon class="el-icon--right"><Icon name="bx:chevron-down" /></el-icon>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item :command="EOrderDropdownCommand.DEMAND"
                >Подать записку</el-dropdown-item
              >
              <el-dropdown-item :command="EOrderDropdownCommand.CANDLE">
                Поставить свечу
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <GBurger v-if="viewport.isLessThan('laptop')" @click="drawer = true" />
      <ElDrawer
        v-if="viewport.isLessThan('laptop')"
        v-model="drawer"
        direction="rtl"
        title="Меню"
        :size="viewport.isLessThan('md') ? '100%' : '300px'"
        class="common-layout__drawer"
      >
        <GNavMenu @click="drawer = false" />
        <div
          v-if="viewport.isLessThan('md')"
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
            Подать записку
          </ElButton>
          <ElButton
            type="primary"
            class="my-auto ml-0 h-[56px] w-full"
            @click="handleCommand(EOrderDropdownCommand.CANDLE)"
          >
            Поставить свечу
          </ElButton>
        </div>
      </ElDrawer>
    </div>
    <GOrderDialog v-if="orderType" v-model="orderDialog" :type="orderType" />
    <GDonationDialog v-model="donationDialog" />
  </el-header>
</template>

<style scoped></style>
