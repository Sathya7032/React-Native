import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator, DrawerContent, DrawerItem } from '@react-navigation/drawer';
import { Entypo } from '@expo/vector-icons';
import HomeScreen from './screens/HomeScreen'
import BlogScreen from './screens/BlogScreen';
import AboutScreen from './screens/AboutScreen';
import Index from './screens/Index';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Tutorials from './screens/Tutorials'
import Codes from './screens/Codes';
import { DrawerToggleButton } from '@react-navigation/drawer';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import Topics from './screens/Topics';
import TopicView from './screens/TopicView';
import Login from './screens/user/Login';
import SignUp from './screens/user/SignUp';
import SingleBlog from './screens/SingleBlog';
import Dashboard from './screens/user/Dashboard';
import { AuthProvider } from './context/AuthContext';
import AuthContext from './context/AuthContext';
import CodeTopics from './screens/codeSnippets/CodeTopics'
import CodeList from './screens/codeSnippets/CodeList';
import Code from './screens/codeSnippets/Code';
import LogoutModal from './screens/LogoutModal';
import YourBlogs from './screens/user/YourBlogs';
import Todo from './screens/user/Todo';
import { FontAwesome5 } from '@expo/vector-icons';
import AddBlog from "./screens/user/AddBlog"

// Creating stack navigator
const Stack = createNativeStackNavigator();

// Creating bottom tab navigator
const Tab = createBottomTabNavigator();

// Creating drawer navigator
const Drawer = createDrawerNavigator();

// Stack Navigator for the Home Screen
function HomeStack({ navigation }) {
  return (
    <Stack.Navigator>

      <Stack.Screen name="Homepage" component={HomeScreen} options={{
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
            <Entypo name="menu" size={24} color="black" style={{ marginRight: 10 }} />
          </TouchableOpacity>
        ),
        headerTitleAlign: 'center',
      }} />

    </Stack.Navigator>
  );
}

// Main Tab Navigator
function MainTabScreen() {
  return (
    <Tab.Navigator screenOptions={{ headerLeft: () => <DrawerToggleButton />, tabBarActiveTintColor: 'white', tabBarInactiveTintColor: 'black', tabBarActiveBackgroundColor: '#233142' }}>
      <Tab.Screen name="Homepage" component={HomeStack} options={{
        headerShown: false, tabBarIcon: ({ color, focused }) => (
          <Entypo name={focused ? "home" : "home"} size={24} color={color} />
        ),
        tabBarLabel: 'Homepage',
      }} />
      <Tab.Screen name="BlogScreen" component={BlogScreen} options={{
        headerTitleAlign: 'center', tabBarIcon: ({ color, focused }) => (
          <MaterialIcons name={focused ? "book" : "book"} size={24} color={color} />
        ),
        tabBarLabel: 'Blogs',
      }} />
      <Tab.Screen name="Tutorials" component={Tutorials} options={{
        headerTitleAlign: 'center', tabBarIcon: ({ color, focused }) => (
          <FontAwesome name={focused ? "institution" : "institution"} size={24} color={color} />
        ),
        tabBarLabel: 'Tutorials',
      }} />

      <Tab.Screen name="Codes" component={Codes} options={{
        headerTitleAlign: 'center', tabBarIcon: ({ color, focused }) => (
          <Entypo name={focused ? "code" : "code"} size={24} color={color} />
        ),
        tabBarLabel: 'Codes',
      }} />
    </Tab.Navigator>
  );
}

// App component
export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <Stack.Navigator initialRouteName='Index'>
          <Stack.Screen name="Main" component={MainDrawerScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Index" component={Index} options={{ headerShown: false }} />
          <Stack.Screen name="topics" component={Topics} />
          <Stack.Screen name="topic" component={TopicView} />
          <Stack.Screen name="Signup" component={SignUp} />
          <Stack.Screen name="singleBlog" component={SingleBlog} />
          <Stack.Screen name="Dashboard" component={Dashboard} options={{
            headerRight: () => (
              <Button
                onPress={() => alert('This is a button!')}
                title="Add blog"
                color="#fff"
              />
            ),
          }} />
          <Stack.Screen name="CodeTopic" component={CodeTopics} />
          <Stack.Screen name="CodeList" component={CodeList} />
          <Stack.Screen name="Code" component={Code} />
          <Stack.Screen name="Logout" component={LogoutModal} />
          <Stack.Screen name="YourBlogs" component={YourBlogs} />
          <Stack.Screen name="AddBlog" component={AddBlog} />
        </Stack.Navigator>
      </AuthProvider>
    </NavigationContainer>
  );
}


function CustomDrawerContent(props) {
  return (
    <View style={{ flex: 1, marginTop: 40 }}>
      <View style={styles.userInfoWrapper}>
        <Text style={{ color: 'black', fontSize: 25, fontWeight: 'bold', textAlign: 'center' }}>Acadamic<Text style={{ color: 'tomato' }}>Folio</Text></Text>
        <Text style={{ textAlign: 'center', color: 'green' }}>Learn with ease</Text>
      </View>
      <DrawerContent {...props} />
    </View>
  );
}
function MainDrawerScreen({navigation}) {
  const { authTokens } = React.useContext(AuthContext);
  const handleHeaderRightPress = () => {
    navigation.navigate('AddBlog');
  };

  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />} screenOptions={{ drawerActiveBackgroundColor: '#233142', drawerActiveTintColor: 'white', drawerInactiveTintColor: 'black' }}>
      <Drawer.Screen name="MainTabs" component={MainTabScreen} options={{
        headerShown: false, drawerLabel: 'Homepage', drawerIcon: ({ color, size }) => (
          <MaterialIcons name="home" color={color} size={size} />
        ),
      }} />
      <Drawer.Screen name="About" component={AboutScreen} options={{
        headerShown: true, headerTitleAlign: 'center', drawerLabel: 'About', drawerIcon: ({ color, size }) => (
          <Entypo name="user" color={color} size={size} />
        ),
      }} />

      {!authTokens ? (
        <Drawer.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: true,
            drawerLabel: 'Login',
            drawerIcon: ({ color, size }) => (
              <MaterialIcons name="login" color={color} size={size} />
            ),
          }}
        />
      ) : (
        <>
          <Drawer.Screen
            name="Dashboard"
            component={Dashboard}
            options={{
              headerShown: true,
              drawerLabel: 'Dashboard',
              drawerIcon: ({ color, size }) => (
                <MaterialIcons name="dashboard" color={color} size={size} />
              ),
              headerRight: () => (
                <TouchableOpacity onPress={handleHeaderRightPress} style={styles.headerButton}>
                  <Text style={styles.headerButtonText}>Add Blog</Text>
                </TouchableOpacity>
              ),
            }}
          />
          <Drawer.Screen
            name="YourBlogs"
            component={YourBlogs}
            options={{
              headerShown: true,
              drawerLabel: 'YourBlogs',
              drawerIcon: ({ color, size }) => (
                <MaterialIcons name="book" color={color} size={size} />
              ),
            }}
          />
          <Drawer.Screen
            name="Todo"
            component={Todo}
            options={{
              headerShown: true,
              drawerLabel: 'Todo',
              drawerIcon: ({ color, size }) => (
                <FontAwesome5 name="tasks" size={24} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="Logout"
            component={LogoutModal}
            options={{
              headerShown: true,
              drawerLabel: 'Logout',
              drawerIcon: ({ color, size }) => (
                <MaterialIcons name="logout" color={color} size={size} />
              ),
            }}
          />

        </>
      )}
    </Drawer.Navigator>
  );
}
const styles = StyleSheet.create({
  navItemLabel: {
    marginLeft: -20,
    fontSize: 18,
  },
  userInfoWrapper: {

    paddingHorizontal: 10,
    paddingVertical: 20,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 10,
    justifyContent: 'center',

  },
  userImg: {
    borderRadius: 40,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginVertical: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
    width: '100%',
  },
  headerButton: {
    marginRight: 10,
    padding: 10,
    backgroundColor: '#233142',
    borderRadius: 5,
  },
  headerButtonText: {
    color: 'white',
    fontSize: 16,
  },

})
