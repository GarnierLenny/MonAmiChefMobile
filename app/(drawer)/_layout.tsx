import { Drawer } from "expo-router/drawer";

export default function DrawerLayout() {
  return (
    <Drawer>
      <Drawer.Screen
        name="chat"
        options={{
          headerShown: false,
          drawerLabel: "Chat",
        }}
      />
    </Drawer>
  );
}
