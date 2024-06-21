<template>
    <main class="mt-3">
        <div class="container">
            <div class="row mb-2">
                <div class="col-12">
                </div>
            </div>
            <div class="row">
                <div class="col-xl-3 col-lg-4 col-md-6" :key="i" v-for="(event,i) in EventList">
                    <div class="card" style="width: 20rem;">
                        <a @click="goToDetail(product.id);" style="cursor:pointer;"><img src="`/img/${product.id}/${product.path}`" class="card-img-top" alt="..."></a>
                        <div class="card-body">
                            <h5 class="card-title">{{ product.product_name }}</h5>
                            <p class="card-text">
                                
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>