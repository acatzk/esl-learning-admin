<template>
    <div class="tab-settings">
        <v-tabs horizontal fixed-tabs color="indigo">
            <v-tab>
                <v-icon left>mdi-account-circle</v-icon>
                Account
            </v-tab>
            <v-tab>
                <v-icon left>settings</v-icon>
                Administrators
            </v-tab>
            <v-tab>
                <v-icon left>mdi-folder-account</v-icon>
                Teachers
            </v-tab>
            <v-tab>
                <v-icon left>mdi-code-tags</v-icon>
                Developers Info
            </v-tab>

            <v-tab-item>
                <account /> <!-- ACCOUNT SETTINGS -->
            </v-tab-item>
            <v-tab-item>
                <Administrator /> <!-- ADMINISTRATOR SETTINGS -->
            </v-tab-item>
            <v-tab-item>
                <v-card flat>
                    <v-card-text>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, perferendis cupiditate quas illum error natus suscipit ut non mollitia hic ratione distinctio quaerat eligendi, dignissimos laborum, eaque voluptate quo eveniet deserunt? Magni adipisci harum, voluptate aut necessitatibus sed molestias. Quam velit laboriosam provident magnam ea tempore nesciunt dicta optio expedita ipsam at cum excepturi sed aut numquam dolore, eius accusamus incidunt quae magni repellendus, eligendi explicabo! Temporibus dolorum architecto delectus ullam laborum. Blanditiis aliquid autem iusto fugit voluptas, ab, et, placeat ad voluptates ipsum neque. Rem eos ex veniam quisquam fuga quod possimus sed soluta consequuntur! Cumque eaque voluptate quod pariatur voluptates vitae ratione ipsam unde alias! Atque quo veritatis aliquam perferendis aspernatur accusantium tempora consequatur dolor velit dolorum officiis debitis harum sit quidem, temporibus molestiae dignissimos totam molestias dolores libero doloribus impedit eveniet alias nam. Placeat odit explicabo consequatur sunt. Nisi eveniet impedit libero, doloremque explicabo esse modi perspiciatis odit expedita, exercitationem, nam amet laborum? Et nostrum itaque dolorem maiores distinctio optio ex vero neque, quos perferendis illum ullam voluptatum, consequatur modi quod natus? Laboriosam exercitationem facere, nihil quod reiciendis fugiat veritatis doloribus quibusdam enim possimus maiores voluptatibus! Veniam, molestias vel dolorum modi deleniti illo dolore officiis, necessitatibus vero suscipit omnis voluptatibus nam odio? Numquam pariatur sequi repellendus necessitatibus distinctio iure esse autem architecto ratione quam earum deserunt alias, maiores consequuntur magni sapiente, est quia exercitationem suscipit voluptas libero voluptatum ipsum quasi. Dolores ducimus consequuntur repellat maiores a mollitia, aspernatur, sit, aut impedit ullam temporibus. Fugit maxime adipisci, eveniet molestiae iste ut recusandae repudiandae deleniti nam, voluptates alias consectetur esse incidunt animi. Ad aut temporibus at nam beatae praesentium repellat vitae ex quaerat minus harum adipisci minima maiores facilis quasi impedit, voluptas doloremque saepe delectus. Labore fuga doloribus hic dolore neque! Sapiente, fugiat quas fuga possimus dolorum itaque repellendus?
                    </v-card-text>
                </v-card>
            </v-tab-item>
            <v-tab-item>
                <dev-info /> <!-- DEVELOPERS INFORMATION -->
            </v-tab-item>
        </v-tabs>
    </div>
</template>

<script>
export default {
    name: 'TabSettings',

    data () {
        return {
            search: '',
        }
    },

    components: {
        Account: () => import('./admin-account/Account'),
        Administrator: () => import('./admin-profiles/Admin'),
        DevInfo: () => import('./developers-info/DevInfo')
    }
}
</script>

<style scoped>

header {
  padding: 15px;
  border-bottom: 1px solid #eee;
}

.v-tabs {
    border: none;
    box-shadow: none;
}

.v-tab {
    text-transform: capitalize;
}

</style>