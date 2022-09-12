<ScrollView decelerationRate={0.5}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.scheduleText}>Schedule Interview</Text>
          <Text style={styles.viewText} onPress={()=>{navigation.navigate('ScheduleInterview')}}>View All</Text>
        </View>
        <View>
          {/* <ScrollView decelerationRate={0.5} horizontal> */}
            <FlatList
              // numColumns={3}
              horizontal
              keyExtractor={item => item.id}
              data={schduleInterview}
              renderItem={({item, index}) => (
                <SafeAreaView style={styles.subBox}>
                  <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity style={{flexDirection:'row'}} 
                        activeOpacity={1}
                        onPress={() => {
                          navigation.navigate('JobDetails');
                        }}>
                    <Image
                      style={{
                        width: 40,
                        height: 40,
                        marginLeft: 10,
                        marginTop: 15,
                      }}
                      // source={item.source}
                      source={require('../images/Reruiting-agent-slice/images.png')}
                    />
                    <View>
                      <Text
                        style={styles.inText}>
                        {item.name}
                      </Text>
                      <Text style={styles.insubText}>{item.job_location}</Text>
                    </View>
                    </TouchableOpacity>
                    <Image
                      style={{
                        width: 13,
                        height: 13,
                        marginLeft: 'auto',
                        marginHorizontal: 15,
                        marginTop: 15,
                      }}
                      source={require('../images/star.png')}
                    />
                  </View>
                  <View style={styles.Line} />
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.redTextForSche}>{item.schedule_date}, {item.schedule_time}</Text>
                    <View
                      style={{
                        width: '40%',
                        marginTop: 10,
                        marginLeft: 'auto',
                      }}>
                      <EndButton title={'Interview Call'} onPress={() => {}} />
                    </View>
                  </View>
                </SafeAreaView>
              )}
            />
          {/* </ScrollView> */}
        </View>

        <View style={{flexDirection: 'row'}}>
          <Text style={styles.scheduleText}>Recommended Jobs</Text>
          <Text
            style={styles.viewText}
            onPress={() => {
              navigation.navigate('RecommendedJobs', recjob);
            }}>
            View All
          </Text>
        </View>
        <View>
          {/* <ScrollView decelerationRate={0.5} horizontal> */}
            <FlatList
              // numColumns={3}
              horizontal
              keyExtractor={item => item.id}
              data={recjob}
              renderItem={({item, index}) => (
                // <SafeAreaView style={styles.subBox}>
                <TouchableOpacity activeOpacity={0.9} style={{flexDirection:'row'}} onPress={()=>navigation.navigate('JobDetails1',{item, userHome})}>
                <View style={styles.subBox}>
                  <View style={{flexDirection: 'row'}}>
                  
                    <Image
                      style={{
                        width: 40,
                        height: 40,
                        marginLeft: 10,
                        marginTop: 15,
                      }}
                      source={require('../images/Reruiting-agent-slice/images.png')}
                    />
                    <View>
                      <Text
                        style={styles.inText}>
                        {item.name}
                      </Text>
                      <Text style={styles.insubText}>{item.job_location}</Text>
                    </View>
                    
                    
                    {/* <TouchableOpacity
                    style={{marginLeft:'auto'}}
                      onPress={()=>addToShortlist(item)}
                    >
                    <Image
                      style={{
                        width: 13,
                        height: 13,
                        marginLeft: 'auto',
                        marginHorizontal: 15,
                        marginTop: 15,
                      }}
                      source={item.shortlist ? require('../images/fill-star.png'): require('../images/star.png')}
                    />
                    </TouchableOpacity> */}

              {item.shortlist==0?(
                    <TouchableOpacity
                    style={{marginLeft:'auto'}}
                      onPress={()=>addToShortlist(item)}
                    >
                    <Image
                      style={{
                        width: 13,
                        height: 13,
                        marginLeft: 'auto',
                        marginHorizontal: 15,
                        marginTop: 15,
                      }}
                      source={require('../images/star.png')}
                    />
                    </TouchableOpacity>
                    ):(
                      <TouchableOpacity
                      style={{marginLeft:'auto'}}
                       onPress={()=>removeFromShortlist(item)}
                      >
                      <Image
                        style={{
                          width: 13,
                          height: 13,
                          marginLeft: 'auto',
                          marginHorizontal: 15,
                          marginTop: 15,
                        }}
                        source={require('../images/fill-star.png')}
                      />
                      </TouchableOpacity>
                    )}

                  </View>
                  <View style={styles.Line} />
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.redText}>{item.work_exp}</Text>
                    <View
                      style={{
                        width: '40%',
                        // marginTop: 10,
                        marginLeft: 'auto',
                        alignItems:'center'
                      }}>
                      {/* <EndButton title={'Interview Call'} onPress={() => {}} /> */}
                      <Text style={styles.redText}>Posted on {item.post_job_date}</Text>
                    </View>
                  </View>
                  </View>
                  </TouchableOpacity>
                // </SafeAreaView>
              )}
            />
          {/* </ScrollView> */}
        </View>

        <View style={{flexDirection: 'row'}}>
          <Text style={styles.scheduleText}>New Post Jobs</Text>
          <Text style={styles.viewText}
          onPress={() => {
            navigation.navigate('NewPostJobs', newpostjob);
            
          }}
          >View All</Text>
        </View>
        <View>
          {/* <ScrollView decelerationRate={0.5} horizontal> */}
            <FlatList
              // numColumns={3}
              horizontal
              keyExtractor={item => item.id}
              data={newpostjob}
              renderItem={({item, index}) => (
                // <SafeAreaView style={styles.subBox}>
                <TouchableOpacity activeOpacity={0.9} onPress={()=>navigation.navigate('JobDetails1',{item, userHome})}
                  style={{flexDirection:'row'}}>
                <View style={styles.subBox}>
                  <View style={{flexDirection: 'row'}}>
                  
                    <Image
                      style={{
                        width: 40,
                        height: 40,
                        marginLeft: 10,
                        marginTop: 15,
                      }}
                      source={require('../images/Reruiting-agent-slice/images.png')}
                    />
                    <View>
                      <Text
                        style={styles.inText}>
                        {item.name}
                      </Text>
                      <Text style={styles.insubText}>{item.job_location}</Text>
                    </View>
                    
                    {item.shortlist==0?(
                    <TouchableOpacity
                    style={{marginLeft:'auto'}}
                      onPress={()=>addToShortlist(item)}
                    >
                    <Image
                      style={{
                        width: 13,
                        height: 13,
                        marginLeft: 'auto',
                        marginHorizontal: 15,
                        marginTop: 15,
                      }}
                      source={require('../images/star.png')}
                    />
                    </TouchableOpacity>
                    ):(
                      <TouchableOpacity
                      style={{marginLeft:'auto'}}
                       onPress={()=>removeFromShortlist(item)}
                      >
                      <Image
                        style={{
                          width: 13,
                          height: 13,
                          marginLeft: 'auto',
                          marginHorizontal: 15,
                          marginTop: 15,
                        }}
                        source={require('../images/fill-star.png')}
                      />
                      </TouchableOpacity>
                    )}
                  </View>
                  <View style={styles.Line} />
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.redText}>{item.work_exp}</Text>
                    <View
                      style={{
                        width: '40%',
                        // marginTop: 10,
                        marginLeft: 'auto',
                      }}>
                      {/* <EndButton title={'Interview Call'} onPress={() => {}} /> */}
                      <Text style={styles.redText}>Posted on {item.post_job_date}</Text>
                    </View>
                  </View>
                  </View>
                  </TouchableOpacity>
                // </SafeAreaView>
              )}
            />
          {/* </ScrollView> */}
        </View>
      </ScrollView>