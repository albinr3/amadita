import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  title: {
  
  },
  logo: {
    flex: 1,
    height: 120,
    width: 180,
    alignSelf: 'center',
    margin: 30
  },
  input: {
    height: 48,
    width: "80%",
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'white',
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 16
  },
  button: {
    backgroundColor: 'rgba(253,72,122,1)',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 48,
    width: "80%",
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  footerView: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20
  },
  footerText: {
    fontSize: 16,
    color: '#2e2e2d'
  },
  footerLink: {
    color: 'rgba(253,72,122,1)',
    fontWeight: 'bold',
    fontSize: 16
  }
})