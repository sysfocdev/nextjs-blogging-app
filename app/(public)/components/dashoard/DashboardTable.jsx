import { SquarePen, Trash2, View } from "lucide-react";


export default function DashboardTable() {
    return (
        <div className="overflow-x-auto m-5">
        <table className="table">
          {/* head */}
          <thead className="bg-[#9377E0] text-white">
            <tr>
              <th></th>
              <th>Title</th>
              <th>Category</th>
              <th> Author</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <th>1</th>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
              <td>Nasir Akhtar</td>
              <td>
                <div className="flex items-center gap-2">
                <SquarePen cursor={"pointer"} color="#EF9B0F"/>
                <View cursor={"pointer"} color="#89CFF0"/>
                <Trash2 cursor={"pointer"} color="red"/>
                </div>
              </td>
            </tr>
            {/* row 2 */}
            <tr>
              <th>2</th>
              <td>Hart Hagerty</td>
              <td>Desktop Support Technician</td>
              <td>Usman </td>
              <td>
                <div className="flex items-center gap-2">
                <SquarePen cursor={"pointer"} color="#EF9B0F"/>
                <View  cursor={"pointer"}   color="#89CFF0"/>
                <Trash2   cursor={"pointer"} color="red"/>
                </div>
              </td>
            </tr>
            {/* row 3 */}
            <tr>
              <th>3</th>
              <td>Brice Swyre</td>
              <td>Tax Accountant</td>
              <td>Ahmad</td>
              <td>
                <div className="flex items-center gap-2">
                <SquarePen  cursor={"pointer"} color="#EF9B0F"/>
                <View       cursor={"pointer"} color="#89CFF0"/>
                <Trash2     cursor={"pointer"} color="red"/>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
  