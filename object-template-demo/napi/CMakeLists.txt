cmake_minimum_required(VERSION 3.9)

set(CMAKE_ARCHIVE_OUTPUT_DIRECTORY "${CMAKE_CURRENT_BINARY_DIR}/${CMAKE_BUILD_TYPE}" CACHE PATH "archive output")
set(CMAKE_LIBRARY_OUTPUT_DIRECTORY "${CMAKE_CURRENT_BINARY_DIR}/${CMAKE_BUILD_TYPE}" CACHE PATH "library output")
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY "${CMAKE_CURRENT_BINARY_DIR}/${CMAKE_BUILD_TYPE}" CACHE PATH "exedll output")
set(CMAKE_PDB_OUTPUT_DIRECTORY     "${CMAKE_CURRENT_BINARY_DIR}/${CMAKE_BUILD_TYPE}" CACHE PATH "pdb output")

project(object_template_demo)

add_compile_options("-sDISABLE_EXCEPTION_CATCHING=0")
add_subdirectory("${CMAKE_CURRENT_SOURCE_DIR}/../../node_modules/@tybys/emnapi" "${CMAKE_CURRENT_SOURCE_DIR}/build/emnapi")

add_executable(object_template_demo object-template-demo.cc proxy-template.cc)

target_link_libraries(object_template_demo emnapi_noruntime)
target_link_options(object_template_demo PRIVATE
  "-sEXPORTED_FUNCTIONS=['_malloc','_free']"
  "-sALLOW_MEMORY_GROWTH=1"
  "-sDISABLE_EXCEPTION_CATCHING=0"
  "-sNODEJS_CATCH_EXIT=0"
)
