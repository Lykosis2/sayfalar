import React from 'react'
import MembershipLayout from './MembershipLayout'

function AgacLayout({ children }) {
  const filterRef = React.useRef(null)

  const availabilityOptions = [
    { value: '00:00 - 24:00', label: '00:00 - 24:00' },
    { value: '9:00 - 17:00', label: '9:00 - 17:00' },
    { value: '9:00 - 17:00', label: '9:00 - 17:00' },
    { value: '9:00 - 17:00', label: '9:00 - 17:00' },
    { value: '9:00 - 17:00', label: '9:00 - 17:00' },
  ]

  // useEffect(() => {
  //   if (filteredUyeler !== null && filteredUyeler.length > 0) {
  //     setFilteredUyeler((prev) => {
  //       const filtered = filterUyeler();
  //       return filtered;
  //     });
  //   }
  // }, [
  //   searchedName,
  //   selectedAvailability,
  //   selectedMember,
  //   selectedPoint,
  //   selectedMoney,
  // ]);

  return (
    <MembershipLayout>

     {
        children
     }
    </MembershipLayout>
  )
}
export default React.memo(AgacLayout)
