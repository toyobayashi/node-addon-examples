cmake_minimum_required(VERSION 3.9)

set(CMAKE_ARCHIVE_OUTPUT_DIRECTORY "${CMAKE_CURRENT_BINARY_DIR}/${CMAKE_BUILD_TYPE}" CACHE PATH "archive output")
set(CMAKE_LIBRARY_OUTPUT_DIRECTORY "${CMAKE_CURRENT_BINARY_DIR}/${CMAKE_BUILD_TYPE}" CACHE PATH "library output")
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY "${CMAKE_CURRENT_BINARY_DIR}/${CMAKE_BUILD_TYPE}" CACHE PATH "exedll output")
set(CMAKE_PDB_OUTPUT_DIRECTORY     "${CMAKE_CURRENT_BINARY_DIR}/${CMAKE_BUILD_TYPE}" CACHE PATH "pdb output")

project(promise-callback-demo)

add_compile_options("-sDISABLE_EXCEPTION_CATCHING=0" "-sUSE_PTHREADS=1")

add_subdirectory("${CMAKE_CURRENT_SOURCE_DIR}/../../node_modules/@tybys/emnapi" "${CMAKE_CURRENT_SOURCE_DIR}/build/emnapi")

add_executable(promise-callback-demo src/promise_callback_demo.cc)

target_link_libraries(promise-callback-demo emnapi)
target_link_options(promise-callback-demo PRIVATE
  "-sEXPORTED_FUNCTIONS=['_malloc','_free']"
  "-sALLOW_MEMORY_GROWTH=1"
  "-sNODEJS_CATCH_EXIT=0"
  "-sDISABLE_EXCEPTION_CATCHING=0"
  "-sUSE_PTHREADS=1"
  "-sPTHREAD_POOL_SIZE=4"
)
