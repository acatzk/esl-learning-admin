<template>
    <div class="profile elevation-0">
        <v-row class="d-flex">
            
            <v-col cols="12" sm="8">
                <v-card
                    class="elevation-6"
                    style="height: 80vh; background: white;"
                >
                    <v-container>
                       
                    </v-container>
                </v-card>
            </v-col>

            <v-col cols="12" sm="4">
                <v-card
                    class="elevation-6 text-center card-profile"
                >
                    <v-container>
                        <v-avatar size="140px" class="elevation-12">
                            <img
                                src="https://cdn.vuetifyjs.com/images/john.jpg"
                                alt="John"
                            >
                        </v-avatar>
                        <div class="content-profile">
                            <span class="company-name mb-2">CEO / CO-FOUNDER - VIC SOLUTION, INC.</span>
                            <div class="title mt-3 mb-3">VICTOR MAGTANGOL</div>
                            <div class="message overflow-y-auto text-justify" style="height: 34vh;">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste cum eligendi exercitationem dolorum nesciunt, ad quo. Perspiciatis, non illum. Explicabo aperiam odio labore. Quos alias explicabo unde, corporis cum sequi accusantium officiis atque sed autem obcaecati quod aspernatur nemo deserunt? Eos perspiciatis recusandae earum tenetur mollitia aut excepturi sint, nostrum, odio nulla velit fugiat minima doloribus eius. Velit molestiae neque debitis saepe in natus maxime reprehenderit laboriosam, optio repellendus voluptatum sit. Ea aut incidunt reprehenderit id quisquam et, quo magnam assumenda aliquid impedit est minima dolores distinctio eum? Eum temporibus atque deleniti quibusdam. Suscipit ab, commodi dolores porro voluptates adipisci doloremque. Quo ab dolore dolor facilis nemo quod neque voluptas natus necessitatibus, in voluptates. Distinctio nulla aut fugiat suscipit esse dolore, laudantium est accusantium possimus velit natus? Debitis quaerat veniam tempora aut repellendus voluptatem eaque sit, quidem ducimus natus, dicta provident vel, dignissimos iusto labore distinctio libero facilis reprehenderit at suscipit itaque nam? Alias delectus ipsum, ad amet ex ab, facere dolor exercitationem excepturi eos nostrum adipisci iure ipsa cupiditate aliquid obcaecati repudiandae similique sint, quae voluptate sed maiores necessitatibus. Aut quaerat consequuntur voluptate iste eveniet. Reprehenderit, sit repudiandae! Debitis a, reprehenderit temporibus rem architecto itaque inventore? Non itaque nostrum facere esse molestiae quaerat earum maxime voluptate obcaecati quasi vitae deleniti qui, amet modi eum sapiente iusto illum fuga cumque repellat, id animi fugiat. Suscipit quaerat quod iste consequatur officia iusto laudantium molestias quasi mollitia! Mollitia cupiditate fuga error fugiat harum. Assumenda voluptatem corrupti tenetur adipisci voluptates natus accusantium pariatur? Nesciunt eveniet sint quasi tempora labore, fugit temporibus illo neque maxime, ratione perferendis veritatis aperiam ipsum iure ipsam! Aliquam, non beatae minima laborum maxime vel accusantium, voluptatem commodi saepe officia doloribus? Labore, impedit vitae perspiciatis molestias quasi similique corporis nemo veritatis expedita velit inventore incidunt reiciendis dolor praesentium repellendus id maiores! Et non, ex expedita illum omnis magnam odit sunt. Repellendus illum autem magnam voluptates enim officiis minima porro! Consequuntur, repudiandae? Repellendus dignissimos et laudantium ab est tempore eius, minus maiores perferendis esse provident. Fugit esse cupiditate facilis totam aliquid commodi, rem quidem eius atque. Praesentium nobis error possimus natus? Rerum itaque ratione fugit illum porro corporis illo iure dolorem assumenda repudiandae quibusdam temporibus, veniam velit consequuntur vitae. Eveniet illum mollitia sapiente placeat quam ut amet aliquid cumque sequi fugit nesciunt quibusdam accusantium voluptatem, corrupti vitae quasi atque qui blanditiis. Velit autem veritatis dolor ipsam ullam necessitatibus possimus facere hic.
                            </div>
                            <v-btn block class="mt-3" color="indigo lighten-2 white--text">
                                Edit Profile
                            </v-btn>
                        </div>
                    </v-container>
                </v-card>
            </v-col>

        </v-row>
    </div>
</template>


<style scoped lang="scss">

.card-profile {
    height: 80vh; 
    background: white;

    .company-name {
        font-size: 13px;
        color: grey;
    }

    .message {
        font-size: 15px;
        font-weight: lighter;
        color: grey;
    }

    .v-avatar {
        position: relative;
        bottom: 25px;
    }

}

</style>