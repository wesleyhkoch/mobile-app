import React, { useEffect, useState } from "react"
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ToastAndroid,
} from "react-native"

import AsyncStorage from "@react-native-async-storage/async-storage"
import { COLOURS, Items } from "../../database/Database"

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"

export const MyCart = ({ navigation }: any) => {
  const [product, setProduct] = useState<any>()
  const [total, setTotal] = useState<any>(null)
  const [numberItems, setNumberItems] = useState<number>(0)

  useEffect(() => {
    const unsubsribe = navigation.addListener("focus", () => {
      getDataFromDB()
    })

    return unsubsribe
  }, [navigation])

  const getDataFromDB = async () => {
    let items = (await AsyncStorage.getItem("cartItems")) as any
    items = JSON.parse(items)
    let productData: any = []
    if (items !== null) {
      Items.forEach((data: any) => {
        if (items.includes(data.id)) {
          productData.push(data)
          return
        }
      })

      setProduct(productData)
      getTotal(productData)
    } else {
      setProduct(false)
      getTotal(false)
    }
  }

  const getTotal = (productData: any) => {
    let total = 0
    for (let i = 0; i < productData.length; i++) {
      let productPrice = productData[i].productPrice
      total = total + productPrice
    }

    setTotal(total)
  }

  const removeItemFromCart = async (id: number) => {
    let itemArray = (await AsyncStorage.getItem("cartItems")) as any
    itemArray = JSON.parse(itemArray)
    if (itemArray !== null) {
      let array = itemArray
      for (let i = 0; i < array.length; i++) {
        if (array[i] == id) {
          array.splice(i, 1)
        }

        await AsyncStorage.setItem("cartItems", JSON.stringify(array))
        getDataFromDB()
      }
    }
  }

  const checkOut = async () => {
    try {
      await AsyncStorage.removeItem("cartItems")
    } catch (error) {
      return error
    }

    ToastAndroid.show("Seus itens chegaram em breve!", ToastAndroid.SHORT)

    navigation.navigate("Home")
  }

  const renderProducts = (data: any, index: number) => {
    return (
      <TouchableOpacity
        key={index}
        onPress={() => {
          navigation.navigate("ProductInfo", { productID: data.id })
        }}
        style={{
          width: "100%",
          height: 100,
          marginVertical: 6,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: "30%",
            height: 100,
            padding: 14,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: COLOURS.backgroundLight,
            borderRadius: 10,
            marginRight: 22,
          }}
        >
          <Image
            source={data.productImage}
            style={{
              width: "100%",
              height: "100%",
              resizeMode: "contain",
            }}
          />
        </View>
        <View
          style={{ flex: 1, height: "100%", justifyContent: "space-around" }}
        >
          <View>
            <Text
              style={{
                fontSize: 14,
                maxWidth: "100%",
                color: COLOURS.black,
                fontWeight: "600",
                letterSpacing: 1,
              }}
            >
              {data.productName}
            </Text>
            <View
              style={{
                marginTop: 4,
                flexDirection: "row",
                alignItems: "center",
                opacity: 0.6,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "400",
                  maxWidth: "85%",
                  marginRight: 4,
                }}
              >
                R&#x24; {data.productPrice}.90
              </Text>
              <Text>
                (~ R&#x24; {data.productPrice + data.productPrice / 20})
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  borderRadius: 100,
                  marginRight: 20,
                  padding: 4,
                  borderWidth: 1,
                  borderColor: COLOURS.backgroundMedium,
                  opacity: 0.5,
                }}
              >
                <MaterialCommunityIcons
                  onPress={() => setNumberItems(numberItems - 1)}
                  name='minus'
                  style={{
                    fontSize: 16,
                    color: COLOURS.backgroundDark,
                  }}
                />
              </View>
              <Text>{numberItems}</Text>
              <View
                style={{
                  borderRadius: 100,
                  marginLeft: 20,
                  padding: 4,
                  borderWidth: 1,
                  borderColor: COLOURS.backgroundMedium,
                  opacity: 0.5,
                }}
              >
                <MaterialCommunityIcons
                  onPress={() => setNumberItems(numberItems + 1)}
                  name='plus'
                  style={{
                    fontSize: 16,
                    color: COLOURS.backgroundDark,
                  }}
                />
              </View>
            </View>
            <TouchableOpacity onPress={() => removeItemFromCart(data.id)}>
              <MaterialCommunityIcons
                name='delete-outline'
                style={{
                  fontSize: 16,
                  color: COLOURS.backgroundDark,
                  backgroundColor: COLOURS.backgroundLight,
                  padding: 8,
                  borderRadius: 100,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: COLOURS.white,
        position: "relative",
      }}
    >
      <ScrollView>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            paddingTop: 16,
            paddingHorizontal: 16,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons
              name='chevron-left'
              style={{
                fontSize: 18,
                color: COLOURS.backgroundDark,
                padding: 12,
                backgroundColor: COLOURS.backgroundLight,
                borderRadius: 12,
              }}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 14,
              color: COLOURS.black,
              fontWeight: "400",
            }}
          >
            Detalhes do pedido
          </Text>
        </View>
        <Text
          style={{
            fontSize: 20,
            color: COLOURS.black,
            fontWeight: "500",
            letterSpacing: 1,
            paddingTop: 20,
            paddingLeft: 16,
            marginBottom: 10,
          }}
        >
          Meu Carrinho
        </Text>
        <View style={{ paddingHorizontal: 16 }}>
          {product ? product.map(renderProducts) : null}
        </View>
        <View>
          <View
            style={{
              paddingHorizontal: 16,
              marginVertical: 10,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: COLOURS.black,
                fontWeight: "500",
                letterSpacing: 1,
                marginBottom: 20,
              }}
            >
              Local de entrega
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  width: "80%",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    backgroundColor: COLOURS.backgroundLight,
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 12,
                    borderRadius: 10,
                    marginRight: 18,
                  }}
                >
                  <MaterialCommunityIcons
                    name='truck-delivery-outline'
                    style={{
                      fontSize: 18,
                      color: COLOURS.blue,
                    }}
                  />
                </View>
                <View>
                  <Text
                    style={{
                      fontSize: 14,
                      color: COLOURS.black,
                      fontWeight: "500",
                    }}
                  >
                    Avenida Paulista, 1000
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: COLOURS.black,
                      fontWeight: "400",
                      lineHeight: 20,
                      opacity: 0.5,
                    }}
                  >
                    São Paulo, Brasil
                  </Text>
                </View>
              </View>
              <MaterialCommunityIcons
                name='chevron-right'
                style={{ fontSize: 22, color: COLOURS.black }}
              />
            </View>
          </View>
          <View
            style={{
              paddingHorizontal: 16,
              marginVertical: 10,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: COLOURS.black,
                fontWeight: "500",
                letterSpacing: 1,
                marginBottom: 20,
              }}
            >
              Método de pagamento
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  width: "80%",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    backgroundColor: COLOURS.backgroundLight,
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 12,
                    borderRadius: 10,
                    marginRight: 18,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: "900",
                      color: COLOURS.blue,
                      letterSpacing: 1,
                    }}
                  >
                    VISA
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      fontSize: 14,
                      color: COLOURS.black,
                      fontWeight: "500",
                    }}
                  >
                    Visa Classic
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: COLOURS.black,
                      fontWeight: "400",
                      lineHeight: 20,
                      opacity: 0.5,
                    }}
                  >
                    ****-1234
                  </Text>
                </View>
              </View>
              <MaterialCommunityIcons
                name='chevron-right'
                style={{ fontSize: 22, color: COLOURS.black }}
              />
            </View>
          </View>
          <View
            style={{
              paddingHorizontal: 16,
              marginTop: 40,
              marginBottom: 80,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: COLOURS.black,
                fontWeight: "500",
                letterSpacing: 1,
                marginBottom: 20,
              }}
            >
              Informações do pedido
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 8,
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "400",
                  maxWidth: "80%",
                  color: COLOURS.black,
                  opacity: 0.5,
                }}
              >
                Subtotal
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "400",
                  maxWidth: "80%",
                  color: COLOURS.black,
                  opacity: 0.8,
                }}
              >
                R&#x24;{total}.00
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 22,
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "400",
                  maxWidth: "80%",
                  color: COLOURS.black,
                  opacity: 0.5,
                }}
              >
                Frete
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "400",
                  maxWidth: "80%",
                  color: COLOURS.black,
                  opacity: 0.8,
                }}
              >
                R&#x24;{total / 10}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "400",
                  maxWidth: "80%",
                  color: COLOURS.black,
                  opacity: 0.5,
                }}
              >
                Total
              </Text>
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: "500",
                  color: COLOURS.black,
                }}
              >
                R&#x24;{total + total / 10}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          position: "absolute",
          bottom: 10,
          height: "8%",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            total !== 0 ? checkOut() : null
          }}
          style={{
            width: "86%",
            height: "90%",
            backgroundColor: COLOURS.blue,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 12,
              fontWeight: "500",
              letterSpacing: 1,
              color: COLOURS.white,
              textTransform: "uppercase",
            }}
          >
            Finalizar (R&#x24;{total + total / 10})
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
