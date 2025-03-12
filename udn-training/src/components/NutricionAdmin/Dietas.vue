<template>
    <h1 class="title-gym">BULL'S GYM</h1>
    <main class="w-[100%] h-auto ml-2">
        <section>
            <div class="mx-auto p-4">
                <div class="bg-gray-900 dark:bg-gray-700 shadow rounded-lg p-6">
                    <h1 class="text-xl font-semibold mb-4 text-gray-100 dark:text-gray-100">Crear nueva dieta</h1>
                    <p class="text-gray-100 dark:text-gray-100 mb-6">Ingresa la información Correspondiente para crear una nueva dieta.</p>
                    <form>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <input type="text" placeholder="Nombre de usuario" class=" p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white">
                            <input type="text" placeholder="Correo electronico del usuario" class=" p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white">
                            <select class="rounded-lg w-full font-medium bg-gray-100  border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white">
                                <option value="">Sexo</option>
                                <option value="masculino">Masculino</option>
                                <option value="femenino">Femenino</option>
                            </select>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <input type="number" placeholder="Altura en Centimetros" class=" p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white">
                            <input type="number" placeholder="Peso actual en Kilogramos" class="border p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white">
                            <select class=" rounded-lg w-full font-medium bg-gray-100  border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white">
                                <option value="">Objetivo de la dieta</option>
                                <option value="perdida">Perdida de peso</option>
                                <option value="aumento">Aumento de masa muscular</option>
                                <option value="mantenimiento">Mantenimiento</option>
                            </select>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <select class="rounded-lg w-full font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white">
                                <option value="">Tipo de Ejercicios Recomendados</option>
                                <option value="cardio">Cardio</option>
                                <option value="pesas">Levantamiento de pesas</option>
                                <option value="tecnicos">Ejercicios tecnicos</option>
                            </select>
                            <select class="border  rounded-lg w-full font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white">
                                <option value="">Dias de Ejercicio</option>
                                <option value="cardio">1 dia a la semana</option>
                                <option value="cardio">2 dias a la semana</option>
                                <option value="cardio">3 dias a la semana</option>
                                <option value="cardio">4 dias a la semana</option>
                                <option value="cardio">5 dias a la semana</option>
                            </select>
                            <input type="number" placeholder="Calorias diarias" class=" p-2 rounded-lg w-full font-medium bg-gray-100  border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white">
                        </div>
                        <textarea name="" id="" cols="30" class="w-full mb-6 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" placeholder="Alimentos recomendados, restricciones u observaciones"></textarea>
                        <button type="button" id="dieta" class="px-4 py-2 w-[20%] rounded bg-red-600 text-white hover:bg-gray-600 focus:outline-none transition-colors">
                            Crear dieta
                        </button>
                    </form>
                </div>
            </div>
            <hr class="border-2 m-4 mt-1">
        </section>
        <section class="m-4">
            <table class="w-full bg-white text-left text-sm text-gray-900 rounded ">
                <thead class="bg-gray-50 text-center">
                    <tr>
                        <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100 rounded-l-md">Nombre de usuario</th>
                        <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">Correo electronico</th>
                        <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">Fecha de creacion</th>
                        <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">Fecha de Actualización</th>
                        <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100 rounded-r-md"></th>
                    </tr>
                </thead>
                <tbody class="bg-gray-200">
                    <tr class="hover:bg-gray-500 ">
                        <th class="h-[50px] text-center">
                            <span>adalid_26</span>
                        </th>
                        <th class="text-center">
                            <span>adalid_iq@gmail.com</span>
                        </th>
                        <th class="text-center">
                            <span>03-Agosto-2024</span>
                        </th>
                        <th class="text-center">
                            <span>08-Agosto-2024</span>
                        </th>
                        <th class="flex justify-center">
                            <button type="button" id="dieta" class="px-4 mt-1 py-2 rounded-md bg-red-600 text-white hover:bg-gray-600">
                                Editar dieta
                            </button>
                        </th>
                    </tr>

                    <tr class="hover:bg-gray-500">
                        <th class="h-[50px] text-center">
                            <span>emilio_MC</span>
                        </th>
                        <th class="text-center">
                            <span>emilio_mc@gmail.com</span>
                        </th>
                        <th class="text-center">
                            <span>04-Agosto-2024</span>
                        </th>
                        <th class="text-center">
                            <span>08-Agosto-2024</span>
                        </th>
                        <th class="flex justify-center">
                            <button type="button" id="dieta" class="px-4 mt-1 py-2 rounded-md bg-red-600 text-white hover:bg-gray-600">
                                Editar dieta
                            </button>
                        </th>
                    </tr>

                    <tr class="hover:bg-gray-500">
                        <th class="h-[50px] text-center">
                            <span>aldair-NPM</span>
                        </th>
                        <th class="text-center">
                            <span>aldair_ai@gmail.com</span>
                        </th>
                        <th class="text-center">
                            <span>05-Agosto-2024</span>
                        </th>
                        <th class="text-center">
                            <span>08-Agosto-2024</span>
                        </th>
                        <th class="flex justify-center">
                            <button type="button" id="dieta" class="px-4 mt-1 py-2 rounded-md bg-red-600 text-white hover:bg-gray-600">
                                Editar dieta
                            </button>
                        </th>
                    </tr>

                    <tr class="hover:bg-gray-500">
                        <th class="h-[50px] text-center">
                            <span>ameli_PG</span>
                        </th>
                        <th class="text-center">
                            <span>ameli_pg@gmail.com</span>
                        </th>
                        <th class="text-center">
                            <span>06-Agosto-2024</span>
                        </th>
                        <th class="text-center">
                            <span>08-Agosto-2024</span>
                        </th>
                        <th class="flex justify-center">
                            <button type="button" id="dieta" class="px-4 mt-1 py-2 rounded-md bg-red-600 text-white hover:bg-gray-600">
                                Editar dieta
                            </button>
                        </th>
                    </tr>

                    <tr class="hover:bg-gray-500">
                        <th class="h-[50px] text-center">
                            <span>adalid_26</span>
                        </th>
                        <th class="text-center">
                            <span>adalid_iq@gmail.com</span>
                        </th>
                        <th class="text-center">
                            <span>03-Agosto-2024</span>
                        </th>
                        <th class="text-center">
                            <span>08-Agosto-2024</span>
                        </th>
                        <th class="flex justify-center">
                            <button type="button" id="dieta" class="px-4 mt-1 py-2 rounded-md bg-red-600 text-white hover:bg-gray-600">
                                Editar dieta
                            </button>
                        </th>
                    </tr>

                    <tr class="hover:bg-gray-500">
                        <th class="h-[50px] text-center">
                            <span>emilio_MC</span>
                        </th>
                        <th class="text-center">
                            <span>emilio_mc@gmail.com</span>
                        </th>
                        <th class="text-center">
                            <span>04-Agosto-2024</span>
                        </th>
                        <th class="text-center">
                            <span>08-Agosto-2024</span>
                        </th>
                        <th class="flex justify-center">
                            <button type="button" id="dieta" class="px-4 mt-1 py-2 rounded-md bg-red-600 text-white hover:bg-gray-600">
                                Editar dieta
                            </button>
                        </th>
                    </tr>

                <!-- 

                    <tr class="hover:bg-gray-500">
                        <th class="h-[50px] text-center">
                            <span>aldair-NPM</span>
                        </th>
                        <th class="text-center">
                            <span>aldair_ai@gmail.com</span>
                        </th>
                        <th class="text-center">
                            <span>05-Agosto-2024</span>
                        </th>
                        <th class="text-center">
                            <span>08-Agosto-2024</span>
                        </th>
                        <th class="flex justify-center">
                            <button type="button" id="dieta" class="px-4 mt-1 py-2 rounded-md bg-red-600 text-white hover:bg-gray-600">
                                Editar dieta
                            </button>
                        </th>
                    </tr>

                    <tr class="hover:bg-gray-500">
                        <th class="h-[50px] text-center">
                            <span>ameli_PG</span>
                        </th>
                        <th class="text-center">
                            <span>ameli_pg@gmail.com</span>
                        </th>
                        <th class="text-center">
                            <span>06-Agosto-2024</span>
                        </th>
                        <th class="text-center">
                            <span>08-Agosto-2024</span>
                        </th>
                        <th class="flex justify-center">
                            <button type="button" id="dieta" class="px-4 mt-1 py-2 rounded-md bg-red-600 text-white hover:bg-gray-600">
                                Editar dieta
                            </button>
                        </th>
                    </tr>

                    <tr class="hover:bg-gray-500">
                        <th class="h-[50px] text-center">
                            <span>adalid_26</span>
                        </th>
                        <th class="text-center">
                            <span>adalid_iq@gmail.com</span>
                        </th>
                        <th class="text-center">
                            <span>03-Agosto-2024</span>
                        </th>
                        <th class="text-center">
                            <span>08-Agosto-2024</span>
                        </th>
                        <th class="flex justify-center">
                            <button type="button" id="dieta" class="px-4 mt-1 py-2 rounded-md bg-red-600 text-white hover:bg-gray-600">
                                Editar dieta
                            </button>
                        </th>
                    </tr>

                    <tr class="hover:bg-gray-500">
                        <th class="h-[50px] text-center">
                            <span>emilio_MC</span>
                        </th>
                        <th class="text-center">
                            <span>emilio_mc@gmail.com</span>
                        </th>
                        <th class="text-center">
                            <span>04-Agosto-2024</span>
                        </th>
                        <th class="text-center">
                            <span>08-Agosto-2024</span>
                        </th>
                        <th class="flex justify-center">
                            <button type="button" id="dieta" class="px-4 mt-1 py-2 rounded-md bg-red-600 text-white hover:bg-gray-600">
                                Editar dieta
                            </button>
                        </th>
                    </tr>

                    <tr class="hover:bg-gray-500">
                        <th class="h-[50px] text-center">
                            <span>aldair-NPM</span>
                        </th>
                        <th class="text-center">
                            <span>aldair_ai@gmail.com</span>
                        </th>
                        <th class="text-center">
                            <span>05-Agosto-2024</span>
                        </th>
                        <th class="text-center">
                            <span>08-Agosto-2024</span>
                        </th>
                        <th class="flex justify-center">
                            <button type="button" id="dieta" class="px-4 mt-1 py-2 rounded-md bg-red-600 text-white hover:bg-gray-600">
                                Editar dieta
                            </button>
                        </th>
                    </tr>

                    <tr class="hover:bg-gray-500">
                        <th class="h-[50px] text-center">
                            <span>ameli_PG</span>
                        </th>
                        <th class="text-center">
                            <span>ameli_pg@gmail.com</span>
                        </th>
                        <th class="text-center">
                            <span>06-Agosto-2024</span>
                        </th>
                        <th class="text-center">
                            <span>08-Agosto-2024</span>
                        </th>
                        <th class="flex justify-center">
                            <button type="button" id="dieta" class="px-4 mt-1 py-2 rounded-md bg-red-600 text-white hover:bg-gray-600">
                                Editar dieta
                            </button>
                        </th>
                    </tr> -->
                </tbody>
            </table>
            <hr class="border-2 mt-4">
        </section>
    </main>
</template>