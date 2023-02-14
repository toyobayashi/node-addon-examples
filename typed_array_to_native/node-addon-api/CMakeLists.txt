cmake_minimum_required(VERSION 3.9)

set(CMAKE_ARCHIVE_OUTPUT_DIRECTORY "${CMAKE_CURRENT_BINARY_DIR}/${CMAKE_BUILD_TYPE}" CACHE PATH "archive output")
set(CMAKE_LIBRARY_OUTPUT_DIRECTORY "${CMAKE_CURRENT_BINARY_DIR}/${CMAKE_BUILD_TYPE}" CACHE PATH "library output")
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY "${CMAKE_CURRENT_BINARY_DIR}/${CMAKE_BUILD_TYPE}" CACHE PATH "exedll output")
set(CMAKE_PDB_OUTPUT_DIRECTORY     "${CMAKE_CURRENT_BINARY_DIR}/${CMAKE_BUILD_TYPE}" CACHE PATH "pdb output")

project(typed_array_to_native)

add_compile_options("-sDISABLE_EXCEPTION_CATCHING=0")

add_subdirectory("${CMAKE_CURRENT_SOURCE_DIR}/../../node_modules/emnapi" "${CMAKE_CURRENT_SOURCE_DIR}/build/emnapi")

add_executable(typed_array_to_native typed_array_to_native.cc)

target_link_libraries(typed_array_to_native emnapi)
target_link_options(typed_array_to_native PRIVATE
  "-sEXPORTED_FUNCTIONS=['_malloc','_free']"
  "-sALLOW_MEMORY_GROWTH=1"
  "-sNODEJS_CATCH_EXIT=0"
  "-sDISABLE_EXCEPTION_CATCHING=0"
)
