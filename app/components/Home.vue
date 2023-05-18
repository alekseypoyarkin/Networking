<template>
  <Page>
    <ActionBar>
      <GridLayout colums="9*, *">
        <Label text="Networking" col="0" />
        <Button text="Обновить" @tap="refresh" col="1" />
      </GridLayout>
    </ActionBar>

    <ScrollView>
      <FlexboxLayout flexDirection="column">
        <FlexboxLayout flexDirection="column">
          <!-- <template v-if="userdata.length">
            <Image :src="userdata['image'][2]['#text']" />
          </template> -->
          <Image src="~/assets/avatar.jpg" class="avatar" />
          <label :text="userdata['name']" class="nickname" />
          <label :text="'Всего прослушано: ' + userdata['playcount']" class="playcount" />
        </FlexboxLayout>

        <label text="Недавние треки:" class="recenttracks-title" />
        <template v-if="recentdata.length">
          <template v-for="index in 5">
            <GridLayout columns="*,5*" rows="auto,auto" class="album">
              <!-- <Image
                :src="recentdata['image'][0]['#text']"
                stretch="none"
                col="0"
                row="0"
                rowSpan="2"
              /> -->
              <label
                :text="
                  recentdata[index - 1]['artist']['#text'] +
                  ' - ' +
                  recentdata[index - 1]['name']
                "
                col="1"
                row="0"
                class="album-album"
              />
            </GridLayout>
          </template>
        </template>
        <DockLayout col="0" row="2">
          <FlexboxLayout dock="bottom">
            <Button text="Топ артистов" @tap="toArtists" width="28%" />
            <Button text="Топ альбомов" @tap="toAlbums" width="28%" />
            <Button text="Топ треков" @tap="toTracks" width="28%" />
          </FlexboxLayout>
        </DockLayout>
      </FlexboxLayout>
    </ScrollView>
  </Page>
</template>

<script>
import { Http } from "@nativescript/core";
import Home from "./Home.vue";
import AlbumsPage from "./AlbumsPage.vue";
import TracksPage from "./TracksPage.vue";
import ArtistsPage from "./ArtistsPage.vue";
export default {
  mounted() {
    Http.getJSON(
      `https://ws.audioscrobbler.com/2.0/?method=user.getinfo&user=keyseee&api_key=5546e1e3c0620b921ebe3b90ad4e8214&format=json`
    )
      .then((result1) => {
        this.userdata = result1["user"];
      })
      .catch((error) => {
        this.description = error;
      });
    Http.getJSON(
      `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=keyseee&limit=5&api_key=5546e1e3c0620b921ebe3b90ad4e8214&format=json`
    ).then((result2) => {
      this.recentdata = result2["recenttracks"]["track"];
    });
  },
  data() {
    return {
      userdata: [],
      recentdata: [],
      description: "",
    };
  },
  methods: {
    toAlbums() {
      this.$navigateTo(AlbumsPage);
    },
    toTracks() {
      this.$navigateTo(TracksPage);
    },
    toArtists() {
      this.$navigateTo(ArtistsPage);
    },
    refresh() {
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
