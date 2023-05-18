<template>
  <Page>
    <ActionBar>
      <Label text="Топ артистов keyseee" />
      <NavigationButton text="Go back" android.systemIcon="ic_menu_back" @tap="goBack" />
    </ActionBar>

    <ScrollView>
      <FlexboxLayout flexDirection="column" class="album-list">
        <template v-if="artistdata.length">
          <template v-for="index in top">
            <GridLayout columns="*,3*,*" rows="auto,auto" class="album">
              <!-- <Image
                    :src="data[index - 1]['image'][2]['#text']"
                    stretch="none"
                    col="0"
                    row="0"
                    rowSpan="2"
                  /> -->
              <label
                :text="artistdata[index - 1]['name']"
                col="1"
                row="0"
                class="album-album"
              />
              <label
                :text="artistdata[index - 1]['playcount']"
                col="2"
                row="0"
                rowSpan="2"
                class="album-playcount"
              />
            </GridLayout>
          </template>
        </template>
        <template v-else>
          <FlexboxLayout class="loading-container">
            <label text="Загрузка страницы..." class="loading" />
          </FlexboxLayout>
        </template>
      </FlexboxLayout>
    </ScrollView>
  </Page>
</template>

<script>
import { Http } from "@nativescript/core";
import Home from "./Home.vue";
export default {
  mounted() {
    Http.getJSON(
      `https://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=keyseee&api_key=5546e1e3c0620b921ebe3b90ad4e8214&format=json`
    )
      .then((result) => {
        this.artistdata = result["topartists"]["artist"];
      })
      .catch((error) => {
        this.description = error;
      });
  },
  data() {
    return {
      top: 49,
      artistdata: [],
    };
  },
  methods: {
    goBack() {
      this.$navigateTo(Home);
    },
  },
};
</script>

<style scoped lang="scss">
@import "@nativescript/theme/scss/variables/blue";

// Custom styles
.fas {
  @include colorize($color: accent);
}

.info {
  font-size: 20;
  horizontal-align: center;
  vertical-align: center;
}
</style>
